// Edit this to change the WhatsApp message. Use {{key}} placeholders — each
// one is filled from the matching query param in the Excel hyperlink, e.g.
// /wp?phone=905551234567&name=Elvin&amount=1500 fills {{name}} and {{amount}}.
const MESSAGE_TEMPLATE = `Salam, hörmətli valideyn!

Şagirdimiz *{{studentName}}* üçün ödəniş qeydə alınmışdır. ✅

🧾 Qəbz №: {{studentId}}-{{paidMonthsCount}}
👤 Şagird: {{studentName}}
📚 Kurs: {{courseName}}
🧑 Müəllim: {{teacherName}}
🗓 Ödəniş dövrü: {{startDate}} - {{endDate}}
💰 Məbləğ: {{amount}} AZN
📅 Ödəniş tarixi: {{paymentDate}}
➡️ Növbəti ödəniş tarixi: {{afterEndDate}}

Hər hansı sualınız olarsa, bu nömrə ilə bizimlə əlaqə saxlaya bilərsiniz.

One Academy
📞 051 388 64 11`;

export function buildMessage(params: Record<string, string>): string {
  return MESSAGE_TEMPLATE.replace(/{{\s*(\w+)\s*}}/g, (_match, key: string) =>
    params[key] ?? ""
  );
}