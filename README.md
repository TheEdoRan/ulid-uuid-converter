# [ulid-uuid-converter](https://github.com/TheEdoRan/ulid-uuid-converter)

> A tiny zero dependency library for ULID to UUID conversion and vice versa.

## Installation

```sh
npm i ulid-uuid-converter
```

## Usage

```typescript
const ulid = UUIDtoULID("0186675b-9439-536e-1c4c-561c280fa87b");
// outputs: 01GSKNQ51SADQ1RK2P3GM0ZA3V

const uuid = ULIDtoUUID("01GSKNQ51SADQ1RK2P3GM0ZA3V");
// outputs: 0186675b-9439-536e-1c4c-561c280fa87b
```

### Options

You can pass an optional second argument with `nullOnInvalidInput` to both functions. With this option the function behavior changes: instead of throwing, it will return `null` if a bad input is passed as argument.

| Option             | Type      | Default | Description                                    |
| ------------------ | --------- | ------- | ---------------------------------------------- |
| nullOnInvalidInput | `boolean` | `false` | Return `null` instead of throwing on bad input |

### Example

```typescript
// these will throw!
const ulid = UUIDtoULID("bad string");
const uuid = ULIDtoUUID("another bad string");

// these will return null instead of throwing
const ulid = UUIDtoULID("bad string", { nullOnInvalidInput: true });
const uuid = ULIDtoUUID("another bad string", { nullOnInvalidInput: true });
```

## Credits

Big thanks to [devbanana](https://github.com/devbanana) for the [Crockford's Base32](https://github.com/devbanana/crockford-base32) encoding and decoding functions.

## License

This project is licensed under the [MIT License](https://github.com/TheEdoRan/ulid-uuid-converter/blob/main/LICENSE).
