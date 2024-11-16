import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

type Props = Readonly<{
  body: string;
  baseUrl: string;
}>;

export default function Email({
  body = "Lorem ipsum",
  baseUrl = "http://localhost:3000",
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>My subject</Preview>

      <Tailwind
        config={{
          theme: {
            extend: {},
          },
        }}
      >
        <Body className="font-sans bg-stone-100 p-2">
          <Container className="mx-auto w-full max-w-[480px] p-6 bg-white rounded drop-shadow-sm">
            <Text className="font-extrabold text-2xl text-center !mt-0">
              My subject
            </Text>

            <Text className="!mb-0">{body}</Text>
          </Container>

          <Container className="text-center text-sm mt-2">
            <div>
              <Link href={`${baseUrl}/imprint`}>Imprint</Link> •{" "}
              <Link href={`${baseUrl}/privacy`}>Privacy</Link>
            </div>
            localhost:3000
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
