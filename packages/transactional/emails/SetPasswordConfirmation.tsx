import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

type Props = Readonly<{
  baseUrl: string;
}>;

export default function Email({ baseUrl = "http://localhost:3000" }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Password changed</Preview>

      <Tailwind>
        <Body className="font-sans bg-stone-100 p-2">
          <Container className="mx-auto w-full max-w-[480px] p-6 bg-white rounded drop-shadow-sm">
            <Text className="font-extrabold text-2xl text-center">
              Password changed
            </Text>

            <Text>Your new password has been saved successfully.</Text>

            <Text className="!mb-0">
              If you did not expect this email, please contact support.
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
