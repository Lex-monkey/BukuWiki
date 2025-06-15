import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FloatingElements from '@site/src/components/FloatingElements';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // 优化动画触发时序
    const timer = setTimeout(() => {
      setIsVisible(true);
      // 触发子元素动画
      document.querySelectorAll('.hero__title span').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('letter-reveal');
        }, i * 150);
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
      description="Minecraft 游玩教程">
      <FloatingElements />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

