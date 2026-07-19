import Navbar from './_component/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-5 md:px-20 mb-40">{children}</main>
    </>
  );
};

export default layout;
