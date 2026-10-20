import { useState } from "react";
import { cardClass, inputClass, primaryButton, Field, PageHeader } from "./ui";

const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\-\[\]{};:'"\\,.<>\/|?]).{8,}$/;

const passwordRule =
  "At least 8 characters, with an uppercase letter, a lowercase letter, a number and a special character.";

const phoneRegex = /^[+\d][\d\s-]{6,}$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const initialProfile = {
  fullname: "Admin One",
  email: "admin1@ipasautomation.com",
};

const initialSite = {
  phone1: "+91-9331888808",
  phone2: "+91-9599842649",
  email1: "info@ipasautomation.com",
  email2: "Ipas2026@gmail.com",
  address:
    "Plot No-659, Badoli, Sector-80\nOpposite Gov. High School\nFaridabad-121004, Haryana, India",
  linkedin: "",
};

const emptyPassword = { current: "", password: "", confirm: "" };

const errorClass = (hasError) => (hasError ? "!border-(--red)" : "");

function FieldError({ text }) {
  if (!text) return null;
  return (
    <p role="alert" className="text-sm text-(--red)!">
      {text}
    </p>
  );
}

function SuccessMessage({ text }) {
  if (!text) return null;
  return (
    <div
      role="status"
      className="px-3 py-2 rounded-md border border-(--green) text-sm text-(--green)"
    >
      {text}
    </div>
  );
}

function ErrorSummary({ errors }) {
  if (Object.values(errors).filter(Boolean).length === 0) return null;
  return (
    <div
      role="alert"
      className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
    >
      Fix the fields marked above and try again.
    </div>
  );
}

function Settings() {
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [profile, setProfile] = useState(initialProfile);
  const [profileErrors, setProfileErrors] = useState({});
  const [profileMessage, setProfileMessage] = useState("");

  const [passwordForm, setPasswordForm] = useState(emptyPassword);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");

  const [savedSite, setSavedSite] = useState(initialSite);
  const [site, setSite] = useState(initialSite);
  const [siteErrors, setSiteErrors] = useState({});
  const [siteMessage, setSiteMessage] = useState("");

  const profileChanged =
    profile.fullname !== savedProfile.fullname ||
    profile.email !== savedProfile.email;

  const siteChanged = Object.keys(initialSite).some(
    (key) => site[key] !== savedSite[key]
  );

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    setProfileMessage("");
  };

  const saveProfile = () => {
    const next = {};
    const fullname = profile.fullname.trim();
    const email = profile.email.trim().toLowerCase();

    if (!fullname) next.fullname = "Enter your full name.";
    if (!email) next.email = "Enter your email.";
    else if (!emailRegex.test(email)) next.email = "Enter a valid email address.";

    setProfileErrors(next);
    if (Object.keys(next).length > 0) return;

    const saved = { fullname, email };
    setProfile(saved);
    setSavedProfile(saved);
    setProfileMessage("Profile saved.");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    setPasswordMessage("");
  };

  const savePassword = () => {
    const next = {};

    if (!passwordForm.current) next.current = "Enter your current password.";

    if (!passwordForm.password) next.password = "Enter a new password.";
    else if (!passwordRegex.test(passwordForm.password)) next.password = passwordRule;
    else if (passwordForm.password === passwordForm.current)
      next.password = "The new password must be different from the current one.";

    if (!passwordForm.confirm) next.confirm = "Confirm the new password.";
    else if (passwordForm.password && passwordForm.confirm !== passwordForm.password)
      next.confirm = "The passwords don't match.";

    setPasswordErrors(next);
    if (Object.keys(next).length > 0) return;

    setPasswordForm(emptyPassword);
    setPasswordMessage("Password updated.");
  };

  const handleSiteChange = (e) => {
    const { name, value } = e.target;
    setSite((prev) => ({ ...prev, [name]: value }));
    setSiteErrors((prev) => ({ ...prev, [name]: "" }));
    setSiteMessage("");
  };

  const saveSite = () => {
    const next = {};
    const values = Object.fromEntries(
      Object.entries(site).map(([key, value]) => [key, value.trim()])
    );

    if (!values.phone1) next.phone1 = "Enter the main phone number.";
    else if (!phoneRegex.test(values.phone1)) next.phone1 = "Enter a valid phone number.";

    if (values.phone2 && !phoneRegex.test(values.phone2))
      next.phone2 = "Enter a valid phone number.";

    if (!values.email1) next.email1 = "Enter the main email.";
    else if (!emailRegex.test(values.email1)) next.email1 = "Enter a valid email address.";

    if (values.email2 && !emailRegex.test(values.email2))
      next.email2 = "Enter a valid email address.";

    if (!values.address) next.address = "Enter the office address.";

    if (values.linkedin && !/^https:\/\/(www\.)?linkedin\.com\/\S+$/i.test(values.linkedin))
      next.linkedin = "Enter a full LinkedIn address, starting with https://linkedin.com/";

    setSiteErrors(next);
    if (Object.keys(next).length > 0) return;

    setSite(values);
    setSavedSite(values);
    setSiteMessage("Contact details saved.");
  };

  const resetSite = () => {
    setSite(savedSite);
    setSiteErrors({});
    setSiteMessage("");
  };

  return (
    <>
      <PageHeader
        title="Settings"
        text="Your account and the contact details shown on the website."
      />

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className={cardClass}
          >
            <h3 className="text-lg">Profile</h3>

            <SuccessMessage text={profileMessage} />

            <Field id="profile-name" label="Full name">
              <input
                id="profile-name"
                name="fullname"
                type="text"
                value={profile.fullname}
                onChange={handleProfileChange}
                aria-invalid={!!profileErrors.fullname}
                className={`${inputClass} ${errorClass(profileErrors.fullname)}`}
              />
              <FieldError text={profileErrors.fullname} />
            </Field>

            <Field id="profile-email" label="Email">
              <input
                id="profile-email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                aria-invalid={!!profileErrors.email}
                className={`${inputClass} ${errorClass(profileErrors.email)}`}
              />
              <FieldError text={profileErrors.email} />
            </Field>

            <ErrorSummary errors={profileErrors} />

            <button
              type="button"
              onClick={saveProfile}
              disabled={!profileChanged}
              className={`${primaryButton} w-full sm:w-auto sm:self-start disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Save profile
            </button>
          </form>

          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className={cardClass}
          >
            <h3 className="text-lg">Change password</h3>

            <SuccessMessage text={passwordMessage} />

            <Field id="current-password" label="Current password">
              <input
                id="current-password"
                name="current"
                type="password"
                autoComplete="current-password"
                value={passwordForm.current}
                onChange={handlePasswordChange}
                aria-invalid={!!passwordErrors.current}
                className={`${inputClass} ${errorClass(passwordErrors.current)}`}
              />
              <FieldError text={passwordErrors.current} />
            </Field>

            <Field id="new-password" label="New password">
              <input
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                aria-invalid={!!passwordErrors.password}
                className={`${inputClass} ${errorClass(passwordErrors.password)}`}
              />
              <FieldError text={passwordErrors.password} />
            </Field>

            <Field id="confirm-password" label="Confirm new password">
              <input
                id="confirm-password"
                name="confirm"
                type="password"
                autoComplete="new-password"
                value={passwordForm.confirm}
                onChange={handlePasswordChange}
                aria-invalid={!!passwordErrors.confirm}
                className={`${inputClass} ${errorClass(passwordErrors.confirm)}`}
              />
              <FieldError text={passwordErrors.confirm} />
            </Field>

            <p className="text-sm">{passwordRule}</p>

            <ErrorSummary errors={passwordErrors} />

            <button
              type="button"
              onClick={savePassword}
              className={`${primaryButton} w-full sm:w-auto sm:self-start`}
            >
              Update password
            </button>
          </form>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className={cardClass}
        >
          <h3 className="text-lg">Website contact details</h3>
          <p className="text-sm">
            These are shown on the contact page and in the footer.
          </p>

          <SuccessMessage text={siteMessage} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="site-phone-1" label="Phone 1">
              <input
                id="site-phone-1"
                name="phone1"
                type="tel"
                value={site.phone1}
                onChange={handleSiteChange}
                aria-invalid={!!siteErrors.phone1}
                className={`${inputClass} ${errorClass(siteErrors.phone1)}`}
              />
              <FieldError text={siteErrors.phone1} />
            </Field>

            <Field id="site-phone-2" label="Phone 2 (optional)">
              <input
                id="site-phone-2"
                name="phone2"
                type="tel"
                value={site.phone2}
                onChange={handleSiteChange}
                aria-invalid={!!siteErrors.phone2}
                className={`${inputClass} ${errorClass(siteErrors.phone2)}`}
              />
              <FieldError text={siteErrors.phone2} />
            </Field>

            <Field id="site-email-1" label="Email 1">
              <input
                id="site-email-1"
                name="email1"
                type="email"
                value={site.email1}
                onChange={handleSiteChange}
                aria-invalid={!!siteErrors.email1}
                className={`${inputClass} ${errorClass(siteErrors.email1)}`}
              />
              <FieldError text={siteErrors.email1} />
            </Field>

            <Field id="site-email-2" label="Email 2 (optional)">
              <input
                id="site-email-2"
                name="email2"
                type="email"
                value={site.email2}
                onChange={handleSiteChange}
                aria-invalid={!!siteErrors.email2}
                className={`${inputClass} ${errorClass(siteErrors.email2)}`}
              />
              <FieldError text={siteErrors.email2} />
            </Field>
          </div>

          <Field id="site-address" label="Works and registered office">
            <textarea
              id="site-address"
              name="address"
              rows={4}
              value={site.address}
              onChange={handleSiteChange}
              aria-invalid={!!siteErrors.address}
              className={`${inputClass} resize-y ${errorClass(siteErrors.address)}`}
            />
            <FieldError text={siteErrors.address} />
          </Field>

          <Field id="site-linkedin" label="LinkedIn page URL (optional)">
            <input
              id="site-linkedin"
              name="linkedin"
              type="url"
              placeholder="https://www.linkedin.com/company/..."
              value={site.linkedin}
              onChange={handleSiteChange}
              aria-invalid={!!siteErrors.linkedin}
              className={`${inputClass} ${errorClass(siteErrors.linkedin)}`}
            />
            <FieldError text={siteErrors.linkedin} />
          </Field>

          <ErrorSummary errors={siteErrors} />

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={saveSite}
              disabled={!siteChanged}
              className={`${primaryButton} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Save contact details
            </button>
            <button
              type="button"
              onClick={resetSite}
              disabled={!siteChanged}
              className="px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Discard changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Settings;