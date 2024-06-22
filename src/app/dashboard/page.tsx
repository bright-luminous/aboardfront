import RootLayout from "../layout";
import DashboardLayout from "./layout";

const Account = () => {
  return <div>Account screen</div>;
};

Account.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;