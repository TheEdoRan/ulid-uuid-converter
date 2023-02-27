// Code from https://github.com/devbanana/crockford-base32/blob/develop/src/index.ts

const B32_CHARACTERS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const crockfordEncode = (input: Buffer): string => {
	const output: number[] = [];
	let bitsRead = 0;
	let buffer = 0;

	// Work from the end of the buffer
	const reversedInput = Buffer.from(input).reverse();

	for (const byte of reversedInput) {
		// Add current byte to start of buffer
		buffer |= byte << bitsRead;
		bitsRead += 8;

		while (bitsRead >= 5) {
			output.unshift(buffer & 0x1f);
			buffer >>>= 5;
			bitsRead -= 5;
		}
	}

	if (bitsRead > 0) {
		output.unshift(buffer & 0x1f);
	}

	return output.map((byte) => B32_CHARACTERS.charAt(byte)).join("");
};

export const crockfordDecode = (input: string): Buffer => {
	let sanitizedInput = input.toUpperCase();

	// Work from the end
	sanitizedInput = sanitizedInput.split("").reverse().join("");

	const output: number[] = [];
	let bitsRead = 0;
	let buffer = 0;

	for (const character of sanitizedInput) {
		const byte = B32_CHARACTERS.indexOf(character);
		if (byte === -1) {
			throw new Error(`Invalid base 32 character found in string: ${character}`);
		}

		buffer |= byte << bitsRead;
		bitsRead += 5;

		while (bitsRead >= 8) {
			output.unshift(buffer & 0xff);
			buffer >>>= 8;
			bitsRead -= 8;
		}
	}

	if (bitsRead >= 5 || buffer > 0) {
		output.unshift(buffer & 0xff);
	}

	return Buffer.from(output);
};
