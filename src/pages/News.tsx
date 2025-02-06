import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import NewsTable from "@/components/news/NewsTable";

const News = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          <NewsTable />
        </div>
      </div>
    </Layout>
  );
};

export default News;