"use client";

import { Advocate } from "@/db/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  /** rather than interacting with the DOM directly, track search term state here */
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: { target: { value: any } }) => {
    /** need to create separate search terms - one that is displayed, the other (sanitized) to be used in fuzzy search below */
    const unsanitizedSearchTerm = e.target.value;
    const sanitizedSearchTerm = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, " ")
      .trim();

    setSearchTerm(unsanitizedSearchTerm);

    console.log("filtering advocates...");
    /** implement basic fuzzy search functionality */
    const filteredAdvocates = advocates.filter((advocate) => {
      const combinedString = [
        advocate.firstName.toLowerCase(),
        advocate.lastName.toLowerCase(),
        advocate.city.toLowerCase(),
        advocate.degree.toLowerCase(),
        advocate.specialties
          .map((specialty) => specialty.toLowerCase())
          .join(" "),
        advocate.yearsOfExperience.toString().toLowerCase(),
        advocate.phoneNumber.toString().toLowerCase(),
      ].join(" ");

      return combinedString.includes(sanitizedSearchTerm);
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
        Solace Advocates
      </h1>
      <div className="mb-8">
        <p className="text-xl font-semibold mb-2">Search</p>
        <p className="text-sm text-gray-600 mb-4">
          Searching for:{" "}
          <span id="search-term" className="font-semibold text-blue-600">
            {searchTerm}
          </span>
        </p>
        <div className="flex items-center space-x-2">
          <input
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChange}
            placeholder="Search advocates..."
            value={searchTerm}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClick}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">City</th>
              <th className="py-3 px-4 text-left">Degree</th>
              <th className="py-3 px-4 text-left">Specialties</th>
              <th className="py-3 px-4 text-left">Years of Experience</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {/** display empty state if search does not return any results */}
            {filteredAdvocates.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No advocates found, please try another search.
                </td>
              </tr>
            )}
            {filteredAdvocates.map((advocate, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-3 px-4">{advocate.firstName}</td>
                <td className="py-3 px-4">{advocate.lastName}</td>
                <td className="py-3 px-4">{advocate.city}</td>
                <td className="py-3 px-4">{advocate.degree}</td>
                <td className="py-3 px-4">
                  {advocate.specialties.map((s, index) => (
                    <div key={index}>{s}</div>
                  ))}
                </td>
                <td className="py-3 px-4">{advocate.yearsOfExperience}</td>
                <td className="py-3 px-4">{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
