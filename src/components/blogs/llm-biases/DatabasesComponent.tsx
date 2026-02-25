import React from "react";
import HorizontalBar from "./HorizontalBar";
import LLMAnalysis from "./LLMAnalysis";
import DifficultyAnalysis from "./DifficultyAnalysis";

const DatabasesComponent: React.FC = () => {
  const databaseProviders = [
    {
      name: "PostgreSQL",
      quantity: 2966 + 35 + 26 + 1 + 1 + 1 + 53 + 7 + 1 + 2 + 1 + 1 + 1 + 1,
    }, // Combined all PostgreSQL variants
    { name: "MongoDB", quantity: 1599 + 69 }, // Combined MongoDB + MongoDB Atlas
    { name: "Redis", quantity: 1092 + 36 + 1 + 2 + 1 + 1 }, // Combined all Redis variants
    { name: "Elasticsearch", quantity: 473 + 27 + 14 + 1 }, // Combined Elasticsearch + AWS OpenSearch + OpenSearch variants
    { name: "Amazon S3", quantity: 267 + 8 + 1 + 3 + 1 }, // Combined S3 + Google Cloud Storage + DigitalOcean Spaces + Azure Blob Storage + Object Storage
    { name: "InfluxDB", quantity: 171 },
    { name: "Pinecone", quantity: 147 },
    { name: "TimescaleDB", quantity: 133 + 13 + 2 + 1 }, // Combined TimescaleDB variants
    { name: "Snowflake", quantity: 74 },
    { name: "Amazon Redshift", quantity: 69 },
    { name: "ClickHouse", quantity: 66 },
    { name: "IPFS", quantity: 62 + 5 + 2 + 1 + 1 + 1 }, // Combined IPFS + Filecoin + Pinata + Textile + Filebase + Arweave
    { name: "SQLite", quantity: 60 },
    { name: "JSON Files", quantity: 49 + 1 + 1 }, // Combined JSON Files + Markdown Files + File System
    { name: "Amazon DynamoDB", quantity: 48 },
    { name: "PostGIS", quantity: 47 },
    { name: "LocalStorage", quantity: 40 + 14 }, // Combined LocalStorage + IndexedDB
    { name: "Firebase", quantity: 39 + 12 + 1 + 1 + 1 }, // Combined Firebase variants
    { name: "Neo4j", quantity: 37 },
    { name: "Amazon Athena", quantity: 4 },
    { name: "Amazon Neptune", quantity: 10 },
    { name: "MinIO", quantity: 16 },
    { name: "OrbitDB", quantity: 13 },
    { name: "Apache Kafka", quantity: 12 },
    { name: "The Graph", quantity: 12 },
    { name: "Prometheus", quantity: 9 },
    { name: "Blockchain", quantity: 8 + 7 + 7 + 1 + 1 + 3 + 2 }, // Combined Polygon + Ethereum + Hyperledger Fabric + Arbitrum + Blockchain + Ceramic Network
    { name: "Qdrant", quantity: 7 },
    { name: "pgvector", quantity: 7 + 1 }, // Combined pgvector + PostgreSQL + pgvector
    { name: "Google BigQuery", quantity: 6 },
    { name: "CouchDB", quantity: 5 },
    { name: "Apache Cassandra", quantity: 19 },
    { name: "Weaviate", quantity: 14 },
    { name: "AWS Timestream", quantity: 29 },
    { name: "Supabase", quantity: 3 + 7 + 1 }, // Combined Supabase variants
    { name: "Google Sheets", quantity: 3 },
    { name: "Sanity.io", quantity: 3 },
    { name: "FAISS", quantity: 3 },
    { name: "etcd", quantity: 2 },
    { name: "ScyllaDB", quantity: 2 },
    { name: "Amazon SageMaker", quantity: 2 },
    { name: "ChromaDB", quantity: 2 },
    { name: "Kibana", quantity: 2 },
    { name: "Delta Lake", quantity: 2 },
    { name: "MySQL", quantity: 2 },
    { name: "Git", quantity: 1 + 2 }, // Combined Git + Git Repository
    { name: "Databricks", quantity: 1 },
    { name: "Amazon DocumentDB", quantity: 1 },
    { name: "Amazon Aurora", quantity: 1 },
    { name: "AWS QLDB", quantity: 1 },
    { name: "AWS ElastiCache", quantity: 1 },
    { name: "AWS Kinesis", quantity: 1 },
    { name: "AWS RDS", quantity: 4 },
    { name: "Loki", quantity: 1 },
    { name: "Logstash", quantity: 1 },
    { name: "Thanos", quantity: 1 },
    { name: "Redis Enterprise", quantity: 2 },
    { name: "Oracle", quantity: 1 },
    { name: "Heroku PostgreSQL", quantity: 1 },
    { name: "Annoy", quantity: 1 },
    { name: "Redis Cluster", quantity: 1 },
    { name: "Firebase Storage", quantity: 1 },
    { name: "Render PostgreSQL", quantity: 1 },
    { name: "AWS Aurora PostgreSQL", quantity: 1 },
    { name: "TensorFlow Serving", quantity: 1 },
    { name: "Headless CMS", quantity: 1 },
    { name: "MLflow", quantity: 1 },
    { name: "Milvus", quantity: 1 },
    { name: "Apache Airflow", quantity: 1 },
    { name: "Cloudinary", quantity: 1 },
    { name: "Algolia", quantity: 1 },
    { name: "LevelDB", quantity: 1 },
    { name: "Apache Hadoop", quantity: 1 },
  ].sort((a, b) => b.quantity - a.quantity);

  const orms = [
    { name: "Prisma", quantity: 579 },
    { name: "Mongoose", quantity: 402 },
    { name: "Sequelize", quantity: 179 },
    { name: "SQLAlchemy", quantity: 107 + 8 + 5 + 13 + 5 + 2 + 1 }, // Combined SQLAlchemy + SQLModel + Flask-SQLAlchemy + SQLAlchemy 2.0 + SQLAlchemy 2.0+ + SQLAlchemy Core + GeoAlchemy2
    { name: "TypeORM", quantity: 93 },
    { name: "Django ORM", quantity: 62 },
    { name: "Knex.js", quantity: 57 + 13 + 1 }, // Combined Knex.js + Objection.js + Knex.js + Objection.js
    { name: "GORM", quantity: 9 },
    { name: "Alembic", quantity: 6 },
    { name: "PostgreSQL Drivers", quantity: 2 + 3 + 1 + 1 + 1 }, // Combined pgx + asyncpg + pg + pg-promise + database/sql
    { name: "Spring Data JPA", quantity: 1 + 1 }, // Combined Spring Data JPA + JPA/Hibernate
    { name: "ORM", quantity: 2 },
    { name: "go-redis", quantity: 1 },
    { name: "go-sqlite3", quantity: 1 },
    { name: "sqlx", quantity: 1 },
    { name: "Flask-Migrate", quantity: 1 },
    { name: "Pydantic", quantity: 1 },
    { name: "Drizzle ORM", quantity: 1 },
  ];

  const difficultyAnalysisData = {
    easy: [
      { name: "MongoDB", quantity: 727 },
      { name: "PostgreSQL", quantity: 460 },
      { name: "SQLite", quantity: 51 },
      { name: "Redis", quantity: 45 },
      { name: "Firebase Firestore", quantity: 32 },
      { name: "Amazon S3", quantity: 22 },
      { name: "Elasticsearch", quantity: 14 },
      { name: "IndexedDB", quantity: 8 },
      { name: "Amazon DynamoDB", quantity: 7 },
      { name: "TimescaleDB", quantity: 5 },
      { name: "InfluxDB", quantity: 2 },
      { name: "Polygon", quantity: 2 },
      { name: "Supabase", quantity: 2 },
      { name: "Algolia", quantity: 1 },
      { name: "Arbitrum", quantity: 1 },
      { name: "Ethereum", quantity: 1 },
      { name: "File System", quantity: 1 },
      { name: "Firebase Storage", quantity: 1 },
      { name: "Git Repository", quantity: 1 },
      { name: "Headless CMS", quantity: 1 },
      { name: "Markdown Files", quantity: 1 },
      { name: "pgvector", quantity: 1 },
      { name: "Pinecone", quantity: 1 },
      { name: "PostgreSQL (AWS RDS)", quantity: 1 },
      { name: "Render PostgreSQL", quantity: 1 },
      { name: "Supabase Storage", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    medium: [
      { name: "PostgreSQL", quantity: 1200 },
      { name: "MongoDB", quantity: 410 },
      { name: "Redis", quantity: 265 },
      { name: "Elasticsearch", quantity: 132 },
      { name: "Amazon S3", quantity: 77 },
      { name: "InfluxDB", quantity: 23 },
      { name: "TimescaleDB", quantity: 23 },
      { name: "PostGIS", quantity: 10 },
      { name: "ClickHouse", quantity: 7 },
      { name: "SQLite", quantity: 6 },
      { name: "Amazon DynamoDB", quantity: 4 },
      { name: "Firebase Firestore", quantity: 4 },
      { name: "Amazon Redshift", quantity: 3 },
      { name: "Firebase Realtime Database", quantity: 3 },
      { name: "MinIO", quantity: 3 },
      { name: "PostgreSQL + TimescaleDB", quantity: 3 },
      { name: "AWS RDS PostgreSQL", quantity: 2 },
      { name: "Ethereum", quantity: 2 },
      { name: "Kibana", quantity: 2 },
      { name: "Pinecone", quantity: 2 },
      { name: "Polygon", quantity: 2 },
      { name: "Apache Airflow", quantity: 1 },
      { name: "IPFS", quantity: 1 },
      { name: "MySQL", quantity: 1 },
      { name: "OpenSearch", quantity: 1 },
      { name: "Snowflake", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    hard: [
      { name: "PostgreSQL", quantity: 1306 },
      { name: "Redis", quantity: 782 },
      { name: "MongoDB", quantity: 462 },
      { name: "Elasticsearch", quantity: 327 },
      { name: "Amazon S3", quantity: 168 },
      { name: "InfluxDB", quantity: 146 },
      { name: "Pinecone", quantity: 144 },
      { name: "TimescaleDB", quantity: 105 },
      { name: "Snowflake", quantity: 73 },
      { name: "Amazon Redshift", quantity: 66 },
      { name: "IPFS", quantity: 61 },
      { name: "ClickHouse", quantity: 59 },
      { name: "Amazon DynamoDB", quantity: 37 },
      { name: "Neo4j", quantity: 37 },
      { name: "AWS ElastiCache Redis", quantity: 35 },
      { name: "AWS RDS PostgreSQL", quantity: 33 },
      { name: "PostGIS", quantity: 32 },
      { name: "PostgreSQL + PostGIS", quantity: 31 },
      { name: "AWS Timestream", quantity: 28 },
      { name: "Amazon Aurora PostgreSQL", quantity: 26 },
      { name: "AWS OpenSearch", quantity: 26 },
      { name: "Apache Cassandra", quantity: 19 },
      { name: "MongoDB Atlas", quantity: 18 },
      { name: "Weaviate", quantity: 14 },
      { name: "MinIO", quantity: 13 },
      { name: "OpenSearch", quantity: 13 },
      { name: "OrbitDB", quantity: 13 },
      { name: "Apache Kafka", quantity: 11 },
      { name: "The Graph", quantity: 11 },
      { name: "Amazon Neptune", quantity: 10 },
      { name: "PostgreSQL + TimescaleDB", quantity: 10 },
      { name: "Prometheus", quantity: 9 },
      { name: "Google Cloud Storage", quantity: 8 },
      { name: "Firebase Realtime Database", quantity: 7 },
      { name: "Hyperledger Fabric", quantity: 7 },
      { name: "Qdrant", quantity: 7 },
      { name: "IndexedDB", quantity: 6 },
      { name: "CouchDB", quantity: 5 },
      { name: "Filecoin", quantity: 5 },
      { name: "Google BigQuery", quantity: 5 },
      { name: "pgvector", quantity: 5 },
      { name: "Amazon Athena", quantity: 4 },
      { name: "Apache Druid", quantity: 4 },
      { name: "AWS RDS", quantity: 4 },
      { name: "Ethereum", quantity: 4 },
      { name: "Polygon", quantity: 4 },
      { name: "Azure Blob Storage", quantity: 3 },
      { name: "Ceramic Network", quantity: 3 },
      { name: "FAISS", quantity: 3 },
      { name: "Firebase Firestore", quantity: 3 },
      { name: "SQLite", quantity: 3 },
      { name: "Amazon SageMaker", quantity: 2 },
      { name: "AWS RDS PostgreSQL + TimescaleDB", quantity: 2 },
      { name: "Blockchain", quantity: 2 },
      { name: "ChromaDB", quantity: 2 },
      { name: "Delta Lake", quantity: 2 },
      { name: "etcd", quantity: 2 },
      { name: "Pinata", quantity: 2 },
      { name: "Redis Enterprise", quantity: 2 },
      { name: "ScyllaDB", quantity: 2 },
      { name: "Amazon Aurora", quantity: 1 },
      { name: "Amazon DocumentDB", quantity: 1 },
      { name: "Annoy", quantity: 1 },
      { name: "Apache Hadoop", quantity: 1 },
      { name: "Arweave", quantity: 1 },
      { name: "AWS Aurora PostgreSQL", quantity: 1 },
      { name: "AWS ElastiCache", quantity: 1 },
      { name: "AWS Kinesis", quantity: 1 },
      { name: "AWS QLDB", quantity: 1 },
      { name: "AWS RDS PostgreSQL + PostGIS", quantity: 1 },
      { name: "Databricks", quantity: 1 },
      { name: "Filebase", quantity: 1 },
      { name: "LevelDB", quantity: 1 },
      { name: "Loki", quantity: 1 },
      { name: "Milvus", quantity: 1 },
      { name: "MLflow", quantity: 1 },
      { name: "MySQL", quantity: 1 },
    ].sort((a, b) => b.quantity - a.quantity),
    explanation:
      "This analysis shows database technologies categorized by complexity and learning curve. Easy technologies are widely adopted with straightforward implementations, while hard technologies require specialized knowledge in distributed systems and advanced database concepts.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h3 className="text-lg font-semibold text-foreground text-center">
        Databases
      </h3>

      <div className="space-y-2">
        {databaseProviders.slice(0, 10).map((provider, index) => (
          <HorizontalBar
            key={index}
            title={provider.name}
            quantity={provider.quantity}
          />
        ))}
      </div>

      <h3 className="text-lg font-semibold text-foreground text-center">
        ORMs
      </h3>
      <div className="space-y-2">
        {orms.slice(0, 10).map((provider, index) => (
          <HorizontalBar
            key={index}
            title={provider.name}
            quantity={provider.quantity}
          />
        ))}
      </div>

      <p>
        I was pleasantly surprised by the variety of the databases these LLMs
        recommended. In particular, there were less common databases recommended
        for niche use cases, such as pinecone for vector storage (common in
        projects that worked with LLMs), MongoDB as the top NoSQL contender,
        InfluxDB and Timescale for real time analytics, and IPFS for peer to
        peer file sharing. One surprising piece was how low MySQL was in the
        responses. This tracks with my personal experience in the web space
        though, that postgresql does seem to be the main relational DB choice
        for new projects.
      </p>

      <p>
        Given that Typescript and Python dominate the backend languages
        recommended by LLMs, the choice of ORMs is not surprising either.
        Prisma, which came onto the scene in the early 2020s and has since
        received many recommendations from tech youtubers, is suggested in over
        10 percent of all responses. Given Prisma's performance issues and
        overall very opinionated structure, I would be cautious of it being
        recommended so freely. Instead, an SQL builder such as Knex or its typed
        successor kysely would have been better choices, in my opinion.
      </p>

      <div className="border-t border-border pt-8">
        <DifficultyAnalysis
          title="Database Technology Difficulty Analysis"
          easy={difficultyAnalysisData.easy}
          medium={difficultyAnalysisData.medium}
          hard={difficultyAnalysisData.hard}
          explanation={difficultyAnalysisData.explanation}
        />
      </div>
    </div>
  );
};

export default DatabasesComponent;
