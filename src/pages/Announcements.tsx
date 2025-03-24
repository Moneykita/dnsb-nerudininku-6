import Layout from "@/components/layout/Layout";

const Announcements = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Skelbimai</h1>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-300">Šiuo metu skelbimų nėra.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Announcements;