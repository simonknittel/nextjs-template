import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface Props {
  readonly tokenId: string;
  readonly baseUrl: string;
}

export default function Email({
  tokenId = "1234567890",
  baseUrl = "http://localhost:3000",
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Set new password</Preview>

      <Tailwind>
        <Body className="font-sans bg-stone-100 p-2">
          <Container className="mx-auto w-full max-w-[480px] p-6 bg-white rounded drop-shadow-sm">
            <Text className="font-extrabold text-2xl text-center">
              Set new password
            </Text>

            <Text>Click on the following link to set a new password:</Text>

            <Button
              href={`${baseUrl}/set-password?token=${tokenId}`}
              className="block text-center rounded-[4px] py-[10px] text-base font-bold bg-black text-white mt-4"
            >
              Set password
            </Button>

            <Text className="!mb-0">
              The link is valid for 24 hours. If you did not expect this email,
              ignore it or contact support.
            </Text>
          </Container>

          <Container className="text-center text-sm mt-2">
            Next.js Template
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
