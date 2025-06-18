import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FloatingElements from '@site/src/components/FloatingElements';
import Heading from '@theme/Heading';
import styles from './index.module.css';

// 开发者数据
const developers = [
  {
    name: "RealCreeper",
    role: "项目主要的贡献者",
    avatar: "/img/realcreeper.jpg"
  },
  {
    name: "Moralts",
    role: "BukuWiki项目的开创者",
    avatar: "/img/moralts.jpg"
  },
  {
    name: "Mr.LHBH",
    role: "项目文档的维护者",
    avatar: "/img/lhbh.png"
  },
  {
    name: "苹果",
    role: "社区维护者",
    avatar: "/img/apple.png"
  }
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        document.querySelectorAll('.hero__title span').forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('letter-reveal');
          }, i * 150); // 主页字母动画保持150ms间隔
        });
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, {
      [styles.heroVisible]: isVisible
    })}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.titleAnimation)}>
          {siteConfig.title.split('').map((char, i) => (
            <span key={i} className={styles.letter}>{char}</span>
          ))}
        </Heading>
        <p className={clsx('hero__subtitle', styles.subtitleAnimation)}>
          {siteConfig.tagline}
        </p>
        <div className={clsx(styles.buttons, styles.buttonAnimation)}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            让我们开始吧 🥵
          </Link>
        </div>
      </div>
    </header>
  );
}

// 修改 DevelopersSection 组件
function DevelopersSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isExpanded && contributors.length === 0) {
      setLoading(true);
      fetch('https://api.github.com/repos/Moralts/BukuWiki/contributors')
        .then(res => {
          if (!res.ok) throw new Error('网络响应失败');
          return res.json();
        })
        .then(data => {
          setContributors(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isExpanded]);

  return (
    <section className={clsx("developers-container", { collapsed: !isExpanded })}>
      {!isExpanded ? (
        <div
          className="developer-card contributor-card"
          style={{
            animationDelay: '0.8s',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onClick={() => setIsExpanded(true)}
        >
          <div className="contributor-card-content">
            <span className="contributor-count">+ 查看所有贡献者</span>
            <div className="expand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className={styles.loading}>
              <div className="spinner" />
              <p>正在加载贡献者数据...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>加载贡献者数据失败: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="developers-container">
              {contributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className="developer-card"
                  style={{
                    animationDelay: `${0.2 * index + 0.4}s`, // 缩短延迟系数和起始时间
                    width: '220px'
                  }}
                >
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}的头像`}
                    className="developer-avatar"
                  />
                  <h3 className="developer-name">{contributor.login}</h3>
                  <p className="developer-role">{contributor.contributions} 次贡献</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    // 页面进入动画
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      mainWrapper.classList.add('page-transition', 'page-entering');
      
      setTimeout(() => {
        mainWrapper.classList.remove('page-entering');
        mainWrapper.classList.add('page-entered');
      }, 100);
    }
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Minecraft 游玩教程"
      className="home-page">
      {/* Delete粒子背景组件 */}
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <DevelopersSection />
      </main>
    </Layout>
  );
}

