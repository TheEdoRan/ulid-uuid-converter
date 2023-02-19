import { ulid as generateULID } from "ulidx";
import { ULIDtoUUID, UUIDtoULID } from "../index";
import { ULID_REGEX, UUID_REGEX } from "../regexes";

describe("case insensitivity", () => {
	test("pass lowercase ULID to ULIDtoUUID() returns valid UUID", () => {
		const ulid = generateULID();
		const uuid = ULIDtoUUID(ulid.toLowerCase());

		expect(uuid).toMatch(UUID_REGEX);
	});

	test("pass uppercase ULID to ULIDtoUUID() returns valid UUID", () => {
		const ulid = generateULID();
		const uuid = ULIDtoUUID(ulid.toUpperCase());

		expect(uuid).toMatch(UUID_REGEX);
	});

	test("pass lowercase UUID to UUIDtoULID() returns valid ULID", () => {
		const ulid = generateULID();
		const uuid = ULIDtoUUID(ulid);
		const convertedULID = UUIDtoULID(uuid.toLowerCase());

		expect(convertedULID).toMatch(ULID_REGEX);
	});

	test("pass uppercase UUID to UUIDtoULID() returns valid ULID", () => {
		const ulid = generateULID();
		const uuid = ULIDtoUUID(ulid);
		const convertedULID = UUIDtoULID(uuid.toUpperCase());

		expect(convertedULID).toMatch(ULID_REGEX);
	});
});

describe("input validation", () => {
	// ULIDtoUUID()

	test("ULIDtoUUID() with a malformed input and no extra opts throws", () => {
		expect(() => {
			ULIDtoUUID("01GSKDWEFA12YDKHP9N43J69B"); // missing one character
		}).toThrow();
	});

	test("ULIDtoUUID() with a malformed input and `nullOnInvalidInput` set to false throws", () => {
		expect(() => {
			ULIDtoUUID("01GSKDWSDJKB7JAEZBTZ36R09U"); // cannot use "U" character
		}).toThrow();
	});

	test("ULIDtoUUID() with a malformed input and `nullOnInvalidInput` set to true returns null", () => {
		const shouldBeNull = ULIDtoUUID("invalid string yet again", { nullOnInvalidInput: true });
		expect(shouldBeNull).toBeNull();
	});

	// UUIDtoULID()

	test("UUIDtoULID() with a malformed input and no extra opts throws", () => {
		expect(() => {
			UUIDtoULID("018666DE-65B2-9ACF-253BEBD7C66C012F"); // missing a "-" at the end
		}).toThrow();
	});

	test("UUIDtoULID() with a malformed input and `nullOnInvalidInput` set to false throws", () => {
		expect(() => {
			UUIDtoULID("018666E0-1405-53CA-2B6B-74B325D8757CL"); // one extra character
		}).toThrow();
	});

	test("UUIDtoULID() with a malformed input and `nullOnInvalidInput` set to true returns null", () => {
		const shouldBeNull = UUIDtoULID("invalid string yet again", { nullOnInvalidInput: true });
		expect(shouldBeNull).toBeNull();
	});
});

// GENERATION

const generateMatches = () => {
	const matches: { ULID: string; UUID: string; convertedULID: string }[] = [];

	for (let i = 0; i < 100; i++) {
		const ULID = generateULID();
		const UUID = ULIDtoUUID(ULID);
		const convertedULID = UUIDtoULID(UUID);

		matches.push({ ULID, UUID, convertedULID: convertedULID });
	}

	return matches;
};

describe("generate 100 ULIDs, convert them to UUIDs and then back to ULIDs", () => {
	test.each(generateMatches())("$ULID -> $UUID -> $convertedULID", ({ ULID, convertedULID }) => {
		expect(ULID).toBe(convertedULID);
	});
});
