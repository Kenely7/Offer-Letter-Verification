import Image from "next/image";

async function getReport(token: string) {
  const res = await fetch(
    "https://sheetdb.io/api/v1/fwn9pl2doe2om/search?token=" + token,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {

  const { token } = await params;

  const data = await getReport(token);

  const report = data[0];

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center border">

          <div className="flex justify-center mb-5">
            <Image
              src="/IIA logo.jpg"
              alt="Company Logo"
              width={90}
              height={90}
            />
          </div>

          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Invalid Request
          </h1>

          <p className="text-gray-600">
            This offer letter could not be verified.
          </p>

          <p className="text-sm text-gray-400 mt-6">
            © 2026 IWUBA IFEDIORA & ASSOCIATES
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/IIA logo.jpg"
            alt="Company Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        

        <p className="text-center text-gray-500 mb-8">
          Offer Letter Verification Portal
        </p>

        {/* Verification Badge */}
        <div className="bg-green-100 border border-green-300 text-green-700 rounded-2xl p-4 text-center font-semibold mb-8">
          ✅ This offer letter is authentic and verified.
        </div>

        {/* Report Information */}
        <div className="space-y-4 text-gray-700">

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Letter ID:</span>
            <span>{report.reportNumber}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Client Name:</span>
            <span>{report.clientName}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Issue Date:</span>
            <span>{report.issueDate}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Subject Property:</span>
            <span className="text-green-600 font-semibold">
              {report.subjectProperty}
            </span>
          </div>

        </div>

        {/* Button */}
        <div className="mt-10 text-center">
          <a
            href={report.driveLink}
            target="_blank"
            className="inline-block bg-blue-900 hover:bg-blue-800 transition text-white px-8 py-4 rounded-2xl font-medium shadow-lg"
          >
            View Offer Letter
          </a>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-400">
          © 2026 Iwuba Ifediora & Associates. All rights reserved.
        </div>

      </div>
    </div>
  );
}