
const demoInvoices = [
  {
    id: "INV-001",
    description: "Fall 2026 Semester Tuition (Demo)",
    amount: 45000,
    status: "Pending",
  },
  {
    id: "INV-002",
    description: "Semester Administrative Fee (Demo)",
    amount: 3000,
    status: "Paid",
  },
];

const demoPayments = [
  {
    id: "PAY-001",
    date: "2026-10-15",
    description: "Demo Tuition Payment",
    amount: 20000,
    status: "Verified",
  },
  {
    id: "PAY-002",
    date: "2026-10-20",
    description: "Demo Administrative Fee",
    amount: 3000,
    status: "Verified",
  },
];

const formatCurrency = (amount) =>
  `BDT ${amount.toLocaleString("en-BD")}`;

export default function StudentBilling() {
  const totalCharges = demoInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  const totalPaid = demoPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const balance = totalCharges - totalPaid;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-900 p-7 text-white">
        <p className="text-sm text-cyan-300">
          Student Finance
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Billing & Payments
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Review semester charges, payment records,
          and outstanding balances.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          {
            label: "Total Charges",
            value: totalCharges,
            color: "text-slate-900",
          },
          {
            label: "Total Paid",
            value: totalPaid,
            color: "text-green-700",
          },
          {
            label: "Outstanding Balance",
            value: balance,
            color: "text-red-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
            <h3 className={`mt-2 text-2xl font-bold ${stat.color}`}>
              {formatCurrency(stat.value)}
            </h3>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-bold">
            Semester Charges
          </h3>
          <p className="text-sm text-slate-500">
            Illustrative Fall 2026 invoice records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {demoInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4 font-semibold">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-bold">
            Payment History
          </h3>
          <p className="text-sm text-slate-500">
            Sample verified payment records
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Payment ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {demoPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4 font-semibold">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">
          Demo Billing Information
        </h3>
        <p className="mt-2 text-sm text-amber-800">
          All charges and payments shown here are fictional
          demonstration records. No actual transactions
          are processed. The official tuition rate must
          be confirmed before implementing billing calculations.
        </p>
      </section>
    </div>
  );
}
