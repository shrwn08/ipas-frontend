


const phones = ["+91-9331888808", "+91-9599842649", "+91-7982903925"];
const emails = ["info@ipasautomation.com", "Ipas2026@gmail.com"];
const needs = [
  "Mill automation",
  "PLC or drive modernization",
  "SCADA or reporting",
  "Electrical panels",
  "Commissioning",
  "Support or AMC",
];

const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--card) text-(--text) focus:outline-none focus:border-(--accent-text)";

const copyClass =
  "shrink-0 px-2 py-0.5 text-xs rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) hover:text-(--accent-text) transition-colors duration-200";

function ContactForm() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 px-4 lg:px-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Phone</h3>
            {phones.map((phone) => (
              <div key={phone} className="flex flex-wrap items-center gap-3">
                <a href={`tel:${phone.replace(/-/g, "")}`}>{phone}</a>
                <button type="button" className={copyClass}>
                  Copy
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Email</h3>
            {emails.map((email) => (
              <div key={email} className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${email}`} className="break-all">
                  {email}
                </a>
                <button type="button" className={copyClass}>
                  Copy
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg">Works and registered office</h3>
            <p>
              Plot No-659, Badoli, Sector-80
              <br />
              Opposite Gov. High School
              <br />
              Faridabad-121004, Haryana, India
            </p>
          </div>
        </div>

        <form className="w-full flex flex-col gap-4 p-4 sm:p-6 rounded-md border border-(--border) bg-(--card)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-(--text)">
                Your name
              </label>
              <input id="name" name="name" type="text" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="company" className="text-sm font-medium text-(--text)">
                Company
              </label>
              <input id="company" name="company" type="text" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-(--text)">
                Email
              </label>
              <input id="email" name="email" type="email" className={inputClass} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-medium text-(--text)">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="need" className="text-sm font-medium text-(--text)">
              What do you need?
            </label>
            <select id="need" name="need" defaultValue="" className={inputClass}>
              <option value="">Select an option</option>
              {needs.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium text-(--text)">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="button"
            className="w-full sm:w-auto sm:self-start bg-(--accent) text-white hover:bg-(--accent-hover) px-5 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm