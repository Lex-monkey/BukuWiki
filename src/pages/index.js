import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function FeatureCard({ title, description, icon, link }) {
  return (
    <Link to={link} className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroButtons}>
              <Link className={clsx('button button--primary', styles.heroBtn)} to="/intro">
                快速开始
              </Link>
              <Link className={clsx('button button--secondary', styles.heroBtn)} to="/docs">
                文档中心
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.featuresSection}>
          <div className={styles.featuresGrid}>
            <FeatureCard
              title="新手入门"
              description="从零开始，快速了解 Minecraft 的基础玩法与服务器加入方法。"
              icon="🎮"
              link="/intro"
            />
            <FeatureCard
              title="常见问题"
              description="遇到问题？这里有最全的解答和解决方案。"
              icon="❓"
              link="/faq"
            />
            <FeatureCard
              title="进阶教程"
              description="进阶玩法、插件、模组、自动化等内容一网打尽。"
              icon="🚀"
              link="/advanced"
            />
            <FeatureCard
              title="社区与支持"
              description="加入我们的社区，获取帮助，结识更多玩家。"
              icon="💬"
              link="/community"
            />
          </div>
        </section>
        {/* 新增 GitHub 贡献标题和概述 */}
        <div style={{ width: '100%', textAlign: 'center', margin: '40px 0 0 0' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>欢迎参与贡献！</h2>
          <p style={{ color: '#4a5a6a', fontSize: '1.05rem', marginBottom: 18 }}>
            发现内容有误或想补充资料？欢迎访问我们的 GitHub 仓库，提交你的建议或 PR，让知识库更完善。
          </p>
          <a
            href="https://github.com/Moralts/BukuWiki"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroBtn}
            style={{ display: 'inline-block', marginTop: 8, textDecoration: 'none' }}
          >
            在 GitHub 上一起做贡献
          </a>
        </div>
        {/* 移除 footer 区块 */}
      </main>
    </Layout>
  );
}
