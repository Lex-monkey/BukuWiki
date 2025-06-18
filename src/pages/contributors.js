import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './index.module.css';

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 从GitHub API获取贡献者数据
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
  }, []);

  return (
    <Layout title="贡献者列表" description="查看所有项目贡献者">
      <main className="container margin-vert--lg">
        <Heading as="h1" className="text--center margin-bottom--xl">
          项目贡献者
        </Heading>
        
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
          <div className="developers-container"> {/* 使用与主页相同的容器类 */}
            {contributors.map((contributor, index) => (
              <div 
                key={contributor.id} 
                className="developer-card" // 使用主页开发者卡片样式
                style={{ 
                  animationDelay: `${0.2 * index + 0.5}s`,
                  width: '220px' // 固定宽度保持一致性
                }}
              >
                <img 
                  src={contributor.avatar_url} 
                  alt={`${contributor.login}的头像`}
                  className="developer-avatar" // 使用相同的头像样式
                />
                <h3 className="developer-name">{contributor.login}</h3>
                <p className="developer-role">{contributor.contributions} 次贡献</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}