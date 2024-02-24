// app/routes/signup.tsx
import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  console.log(
    "🚀 ~ constaction:ActionFunction= ~ username:",
    username,
    " password: ",
    password
  );

  // Perform signup logic here, e.g., create user in the database
  // If successful, redirect to the login page or dashboard
  return redirect("/login");
};

export default function Index() {
  const actionData = useActionData();
  // Handle actionData for errors or success messages

  return (
    <Form method="post" className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>
    </Form>
  );
}
