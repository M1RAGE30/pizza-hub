import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "./send-email";
import { VerificationUserTemplate } from "@/shared/components/shared/email-temapltes/verification-user";

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createVerificationCode(userId: number): Promise<string> {
  await prisma.verificationCode.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateVerificationCode();

  await prisma.verificationCode.create({
    data: {
      code,
      userId,
    },
  });

  return code;
}

export async function sendVerificationCode(
  email: string,
  code: string
): Promise<void> {
  try {
    await sendEmail(
      email,
      "Next Pizza / 📝 Подтверждение регистрации",
      VerificationUserTemplate({ code }) as any
    );
  } catch (error) {
    console.log("Error [SEND_VERIFICATION_CODE]", error);
  }
}

export async function createAndSendVerificationCode(
  userId: number,
  email: string
): Promise<void> {
  const code = await createVerificationCode(userId);
  await sendVerificationCode(email, code);
}

export async function verifyVerificationCode(code: string): Promise<number> {
  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  });

  if (!verificationCode) {
    throw new Error("Неверный код подтверждения");
  }

  await prisma.user.update({
    where: {
      id: verificationCode.userId,
    },
    data: {
      verified: new Date(),
    },
  });

  await prisma.verificationCode.delete({
    where: {
      id: verificationCode.id,
    },
  });

  return verificationCode.userId;
}
