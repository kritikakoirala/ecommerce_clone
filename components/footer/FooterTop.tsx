import { Clock, Mail, MapPin, Phone } from "lucide-react";


interface ContactFormData {
  title: string,
  subtitle: string,
  icon: React.ReactNode
}[]
export default function FooterTop() {

  const data: ContactFormData[] = [
    {
      title: "Visit Us",
      subtitle: "New Orlean, USA",
      icon: (
        <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: "Call Us",
      subtitle: "+12 958 648 597",
      icon: (
        <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: "Working Hours",
      subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
      icon: (
        <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
      ),
    },
    {
      title: "Email Us",
      subtitle: "Shopcart@gmail.com",
      icon: (
        <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {
        data?.map((item, index) => {
          return (
            <ContactItem key={index} item={item} />
          )
        })
      }
    </div>
  )
}


export const ContactItem = ({ item }: { item: ContactFormData }) => {
  return (
    <div className="flex items-center justify-start gap-3 group hover:bg-gray/50 p-4 transition-colors hoverEffect">
      {item?.icon}
      <div>
        <h2 className="font-semibold text-gray-900 group-hover:text-black">{item?.title}</h2>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900">{item?.subtitle}</p>
      </div>
    </div>
  )
}
