import Layout from "@layouts/Layout";

import Home from "@pages/Home";
import FormWizard from "@pages/FormWizard";
import ThankYou from "@pages/ThankYou";

import withAuth from "@hoc/withAuth";

const ProtectedThankYou = withAuth(ThankYou);

export const ROUTES = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "form/*", element: <FormWizard /> },
      { path: "/thank-you", element: <ProtectedThankYou /> },
      { path: "*", element: <Home /> },
    ],
  },
];
