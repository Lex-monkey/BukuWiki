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
    // 优化动画触发时序
    const timer = setTimeout(() => {
      setIsVisible(true);
      // 批量处理DOM操作
      requestAnimationFrame(() => {
        document.querySelectorAll('.hero__title span').forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('letter-reveal');
          }, i * 150);
        });
      });
    }, 800);
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

// 开发者卡片组件
function DevelopersSection() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <section className="developers-container">
      <Link
        to="/contributors"
        className="developer-card contributor-card"
        style={{ 
          animationDelay: '0.8s',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="contributor-card-content">
          <span className="contributor-count">+ 查看所有贡献者</span>
          <div className="expand-icon">
            {/* 使用更现代的箭头图标 */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
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

