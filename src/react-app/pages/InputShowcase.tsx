import { useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Input, { SearchInput, Textarea, Select } from "@/react-app/components/Input";
import { Mail, Lock, User, Phone, DollarSign } from "lucide-react";
import Button from "@/react-app/components/Button";

export default function InputShowcase() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("india");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Input Showcase</h1>
          <p className="text-xl text-gray-600">
            Beautiful form inputs with sophisticated styling and smooth interactions
          </p>
        </div>

        {/* Search Inputs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Inputs</h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default Search</p>
              <SearchInput
                placeholder="Search for stocks by name or symbol..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={(value) => console.log("Searching:", value)}
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Search with Custom Placeholder</p>
              <SearchInput
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Disabled Search</p>
              <SearchInput
                placeholder="Search disabled..."
                disabled
              />
            </div>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5" />}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              icon={<Phone className="w-5 h-5" />}
            />

            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              icon={<DollarSign className="w-5 h-5" />}
            />

            <Input
              label="Website"
              type="url"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Input States */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Input
              label="Default State"
              placeholder="Enter text..."
            />

            <Input
              label="With Value"
              placeholder="Enter text..."
              value="Sample text"
              readOnly
            />

            <Input
              label="Disabled State"
              placeholder="Disabled input..."
              disabled
            />

            <Input
              label="Error State"
              placeholder="Enter email..."
              error="Please enter a valid email address"
            />

            <Input
              label="Required Field"
              placeholder="Required field..."
              required
            />

            <Input
              label="Read Only"
              placeholder="Read only..."
              value="Cannot edit this"
              readOnly
            />
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Textarea</h2>
          <div className="max-w-2xl space-y-6">
            <Textarea
              label="Message"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            <Textarea
              label="Description"
              placeholder="Enter description..."
              rows={6}
            />

            <Textarea
              label="Error State"
              placeholder="Enter text..."
              error="This field is required"
              rows={3}
            />
          </div>
        </div>

        {/* Select Dropdown */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Dropdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Select
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={[
                { value: "india", label: "India" },
                { value: "usa", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "canada", label: "Canada" },
                { value: "australia", label: "Australia" },
              ]}
            />

            <Select
              label="Stock Exchange"
              options={[
                { value: "nse", label: "NSE (National Stock Exchange)" },
                { value: "bse", label: "BSE (Bombay Stock Exchange)" },
                { value: "nyse", label: "NYSE (New York Stock Exchange)" },
                { value: "nasdaq", label: "NASDAQ" },
              ]}
            />

            <Select
              label="Time Period"
              options={[
                { value: "1d", label: "1 Day" },
                { value: "1w", label: "1 Week" },
                { value: "1m", label: "1 Month" },
                { value: "3m", label: "3 Months" },
                { value: "6m", label: "6 Months" },
                { value: "1y", label: "1 Year" },
              ]}
            />

            <Select
              label="Disabled Select"
              disabled
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
            />
          </div>
        </div>

        {/* Form Example */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Form Example</h2>
          <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  placeholder="John"
                  icon={<User className="w-5 h-5" />}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  icon={<User className="w-5 h-5" />}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                icon={<Phone className="w-5 h-5" />}
              />

              <Select
                label="Subject"
                options={[
                  { value: "", label: "Select a subject" },
                  { value: "general", label: "General Inquiry" },
                  { value: "support", label: "Technical Support" },
                  { value: "sales", label: "Sales" },
                  { value: "feedback", label: "Feedback" },
                ]}
                required
              />

              <Textarea
                label="Message"
                placeholder="Tell us how we can help you..."
                rows={5}
                required
              />

              <div className="flex items-center space-x-4">
                <Button variant="primary" size="lg" type="submit">
                  Send Message
                </Button>
                <Button variant="white" size="lg" type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Input Variants */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Variants</h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <p className="text-sm text-gray-600 mb-2">Default Variant</p>
              <Input
                variant="default"
                placeholder="Default input with shadow..."
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Search Variant</p>
              <Input
                variant="search"
                placeholder="Search variant with icon..."
                icon={<Mail className="w-5 h-5" />}
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Minimal Variant</p>
              <Input
                variant="minimal"
                placeholder="Minimal variant with less shadow..."
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
