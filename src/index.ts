import { crockfordDecode, crockfordEncode } from "./base32";
import { ULID_REGEX, UUID_REGEX } from "./regexes";

type NullOnInvalidInput = {
	nullOnInvalidInput: true;
};

type ThrowOnInvalidInput = {
	nullOnInvalidInput: false;
};

// UUID -> ULID

export function UUIDtoULID(ulid: string, opts?: ThrowOnInvalidInput): string;
export function UUIDtoULID(ulid: string, opts: NullOnInvalidInput): string | null;

export function UUIDtoULID(uuid: string, opts?: NullOnInvalidInput | ThrowOnInvalidInput) {
	const isValid = UUID_REGEX.test(uuid);

	if (!isValid) {
		if (opts?.nullOnInvalidInput) {
			return null;
		}

		throw new Error("UUID to ULID conversion failed: invalid UUID input");
	}

	const ulid = crockfordEncode(Buffer.from(uuid.replace(/-/g, ""), "hex"));

	return ulid;
}

// ULID -> UUID

export function ULIDtoUUID(ulid: string, opts?: ThrowOnInvalidInput): string;
export function ULIDtoUUID(ulid: string, opts: NullOnInvalidInput): string | null;

export function ULIDtoUUID(ulid: string, opts?: NullOnInvalidInput | ThrowOnInvalidInput) {
	const isValid = ULID_REGEX.test(ulid);

	if (!isValid) {
		if (opts?.nullOnInvalidInput) {
			return null;
		}

		throw new Error("ULID to UUID conversion failed: invalid ULID input");
	}

	const uuid = crockfordDecode(ulid)
		.toString("hex")
		.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5") // add hyphens
		.toLowerCase();

	return uuid;
}
