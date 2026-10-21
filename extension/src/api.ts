import type { HostRequestError } from "@openchamber/sdk";
import type { LedgerResponse, RowDetail, TrajectorySnapshot } from "./types";

type HostClient = {
  serviceRequest: (request: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    query?: Record<string, string>;
    body?: string;
  }) => Promise<{ status: number; body: string }>;
};

const parse = <T>(body: string): T => {
  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(body.slice(0, 500) || "The extension service returned an empty answer.");
  }
};

export class ServiceError extends Error {
  code: string;
  constructor(message: string, code = "SERVICE_ERROR") {
    super(message);
    this.name = "ServiceError";
    this.code = code;
  }
}

export const describeError = (error: unknown): { code: string; message: string } => {
  if (error instanceof ServiceError) return { code: error.code, message: error.message };
  if (error && typeof error === "object" && "code" in error && "message" in error) {
    return {
      code: String((error as HostRequestError).code ?? "HOST_ERROR"),
      message: String((error as HostRequestError).message ?? error),
    };
  }
  return { code: "UNKNOWN", message: String(error instanceof Error ? error.message : error) };
};

export const fetchLedger = async (
  host: HostClient,
  sessionId: string,
  directory: string | null,
  afterSeq: number,
  wait = 8000,
): Promise<LedgerResponse> => {
  const query: Record<string, string> = {
    sessionId,
    afterSeq: String(afterSeq),
    wait: String(wait),
    limitTurns: "80",
  };
  if (directory) query.directory = directory;
  const result = await host.serviceRequest({ method: "GET", path: "/ledger", query });
  const body = parse<LedgerResponse>(result.body);
  if (result.status >= 400 && !("ok" in body)) {
    throw new ServiceError(`Trajectory service answered ${result.status}`, "SERVICE_ERROR");
  }
  return body;
};

export const fetchRow = async (
  host: HostClient,
  sessionId: string,
  directory: string | null,
  rowId: string,
): Promise<RowDetail> => {
  const query: Record<string, string> = { sessionId, rowId };
  if (directory) query.directory = directory;
  const result = await host.serviceRequest({ method: "GET", path: "/row", query });
  const body = parse<RowDetail | { ok: false; code?: string; message?: string }>(result.body);
  if (body.ok !== true) {
    throw new ServiceError(
      "message" in body ? body.message ?? body.code ?? "Row not found" : "Row not found",
      "code" in body ? body.code ?? "ROW_NOT_FOUND" : "ROW_NOT_FOUND",
    );
  }
  return body;
};

export const fetchHeader = async (
  host: HostClient,
  sessionId: string,
  directory: string | null,
  headerId: number,
): Promise<TrajectorySnapshot["collector"] | unknown> => {
  const query: Record<string, string> = { sessionId, headerId: String(headerId) };
  if (directory) query.directory = directory;
  const result = await host.serviceRequest({ method: "GET", path: "/header", query });
  const body = parse<{ ok: true; header: unknown } | { ok: false; message?: string }>(result.body);
  if (body.ok !== true) throw new ServiceError(body.message ?? "Request header not found", "HEADER_NOT_FOUND");
  return body.header;
};

export const fetchInfo = async (host: HostClient): Promise<unknown> => {
  const result = await host.serviceRequest({ method: "GET", path: "/info" });
  return parse<unknown>(result.body);
};
