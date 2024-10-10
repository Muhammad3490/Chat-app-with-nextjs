"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import debounce from "lodash.debounce";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

const SearchPeople = ({profileId}:{profileId:string}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch users from the server
  const fetchUsers = async (query: string) => {
    if (!query) {
      setFoundUsers([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/search?q=${query}`);
      const data = await res.json();
      setFoundUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    fetchUsers(query);
  }, 300);

  // Handle input change and trigger debounced search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label htmlFor="search" className="block text-sm font-medium text-gray-700">
        Search People
      </Label>
      <Input
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or email"
        className="mt-1 block w-full border rounded-md shadow-sm p-2"
      />
      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {!isLoading && foundUsers.length === 0 && searchQuery && (
          <p>No users found</p>
        )}
        <ul>
          {foundUsers.map((user) => (
            <Link key={user.id} href={`/${profileId}/chats/users/${user.id}`}>
            <li  className="flex items-center p-2 border-b">
              <img
                src={user.imageUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPeople;
