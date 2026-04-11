import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  HelpCircle,
} from "lucide-react";

const CONTACT_DETAILS = [
  { icon: <Phone size={24} className="text-[#16A34A]" />, title: "Phone", subtext: "Mon-Fri from 8am to 6pm", value: "+1 (800) 123-4567" },
  { icon: <Mail size={24} className="text-[#16A34A]" />, title: "Email", subtext: "We'll respond within 24 hours", value: "support@freshcart.com" },
  { icon: <MapPin size={24} className="text-[#16A34A]" />, title: "Office", subtext: "Come say hello at our office", value: "123 Commerce Street, New York, NY 10001, USA" },
  { icon: <Clock size={24} className="text-[#16A34A]" />, title: "Business Hours", subtext: "Sat: 9am - 4pm, Sun: Closed", value: "Monday - Friday: 8am - 6pm" },
];

const SOCIAL_ICONS = [Facebook, Twitter, Instagram, Linkedin];

export default function ContactSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Contact details card */}
      <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6 shadow-sm flex flex-col gap-8">
        {CONTACT_DETAILS.map((detail, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#DEF5E5] flex items-center justify-center flex-shrink-0">
              {detail.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-[#212529] mb-0.5">{detail.title}</h3>
              <p className="text-sm text-[#6C757D] mb-1">{detail.subtext}</p>
              <p className="text-sm font-semibold text-[#16A34A]">{detail.value}</p>
            </div>
          </div>
        ))}

        {/* Social links */}
        <div className="border-t border-[#E9ECEF] pt-6 mt-2">
          <h3 className="text-base font-bold text-[#212529] mb-4">Follow Us</h3>
          <div className="flex items-center gap-3">
            {SOCIAL_ICONS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#6C757D] hover:bg-[#16A34A] hover:text-white transition-colors duration-300"
                aria-label="Social Link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Help Center CTA */}
      <div className="bg-[#DEF5E5]/50 rounded-2xl border border-[#DEF5E5] p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 flex items-center justify-center flex-shrink-0">
          <HelpCircle size={20} className="text-[#16A34A]" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#212529] mb-1">Need quick answers?</h4>
          <a href="/help" className="text-sm font-semibold text-[#16A34A] hover:underline flex items-center gap-1">
            Visit Help Center <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
