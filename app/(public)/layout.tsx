import Navbar from "./_component/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mb-40">{children}</main>
    </>
  );
};

export default layout;
