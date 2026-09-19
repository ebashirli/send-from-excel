import dayjs from "dayjs";
import { redirect } from "next/navigation";
// import { buildMessage } from "./message-template";

type SearchParams = { [key: string]: string | string[] | undefined };

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function WhatsAppRedirectPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  
  const [
    studentId,
    teacherName,
    courseName,
    studentName,
    grade,
    days,
    time,
    firstLesson,
    amount,
    lastLesson,
    parent,
    rawPhone,
    ...rest
  ] = (params?.row as string).split("|") || ["", ""];

  const phone = normalizePhone(firstValue(rawPhone));

    
  if (!phone) {
    return (
      <main className="flex flex-1 items-center justify-center p-8 text-center">
        <p className="text-red-600">
          Telefon nömrəsi mütləq tələb edilir. URL-də{" "}
          <code>phone</code> parametri mütləq olmalıdır, məs.:{" "}
          <code>/wp?phone=994552183218&amp;name=Elvin</code>
        </p>
      </main>
    );
  }
  
  const paymentDates = rest.filter(el=>el);
  const paymentCount = paymentDates.length;
  const firstLessonDate = dayjs("1900-01-01").add(Number(firstLesson)-2, "day");
  const startDate = dayjs("1900-01-01").add(Number(firstLesson)-2, "day").add(paymentCount - 1, "month");
  const endDate = startDate.add(1, "month").subtract(1, "day");
  const paymentDate = dayjs("1900-01-01").add(Number(paymentDates.at(-1))-2, "day");
  const afterEndDate = startDate.add(1, "month");

  
  const message = `Salam, hörmətli valideyn!

Şagirdimiz *${studentName}* üçün ödəniş qeydə alınmışdır. ✅

🧾 Ödəniş kodu: ${studentId}-${`${paymentCount}`.padStart(2,"0")}
👤 Şagird: ${studentName}
📚 Kurs: ${courseName}
🧑 Müəllim: ${teacherName}
🗓 Ödəniş dövrü: ${startDate.format("DD.MM.YYYY")} - ${endDate.format("DD.MM.YYYY")}
➡️ Növbəti ödəniş tarixi: ${afterEndDate.format("DD.MM.YYYY")}
🗓 İlk dərsin tarixi: ${firstLessonDate.format("DD.MM.YYYY")}
💰 Məbləğ: ${amount} AZN
📅 Ödəniş tarixi: ${paymentDate.format("DD.MM.YYYY")}

Hər hansı sualınız olarsa, bu nömrə ilə bizimlə əlaqə saxlaya bilərsiniz.

One Academy
📞 051 388 64 11`;

  console.log("Redirecting to WhatsApp with message:", message);

  const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`

  redirect(url);
}
