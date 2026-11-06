import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUp, ArrowUpRight, Mail, Maximize2, Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'
import content from './content.json'

type Media = {
  kind: string; src: string; alt: string; caption: string
  width: number; height: number; poster?: string
}
type Project = (typeof content.projects)[number]
const email = 'dudghks667@gmail.com'
const slug = location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index'
const project = content.projects.find(item => item.slug === slug)
const isTechnical = slug.startsWith('technical')
const headerMotion = { threshold: 32, expandedRadius: 16, radius: 32, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }

function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > headerMotion.threshold)
  const reducedMotion = useReducedMotion()
  const transition = { duration: reducedMotion ? 0 : headerMotion.duration, ease: headerMotion.ease }
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > headerMotion.threshold)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])
  return <motion.header layoutRoot className="header-shell"><motion.div layout={!reducedMotion} initial={false} animate={{ borderRadius: scrolled ? headerMotion.radius : headerMotion.expandedRadius }} transition={transition} className="site-header" data-scrolled={scrolled}>
    <motion.nav layout="position" transition={transition} aria-label="주요 메뉴" className="main-nav">
      <a href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</a>
      <a href="environment.html" aria-current={slug.startsWith('environment') ? 'page' : undefined}>Environment Art</a>
      <a href="technical-art.html" aria-current={isTechnical ? 'page' : undefined}>Technical Art</a>
    </motion.nav>
    <motion.a layout="position" transition={transition} className="mobile-home" href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</motion.a>
    <motion.div layout="position" transition={transition} className="header-actions">
    <Button asChild className="header-contact"><a href={`mailto:${email}`} aria-label="이메일 연락">Contact<Mail data-icon="inline-end" aria-hidden="true" /></a></Button>
    <Dialog>
      <DialogTrigger asChild><Button className="mobile-menu-trigger" variant="ghost" size="icon" aria-label="메뉴 열기"><Menu aria-hidden="true" /></Button></DialogTrigger>
      <DialogContent className="mobile-menu" showCloseButton={false} aria-describedby={undefined}>
        <div className="mobile-menu-top"><DialogTitle>메뉴</DialogTitle><DialogClose asChild><Button variant="ghost" size="icon" aria-label="메뉴 닫기"><X aria-hidden="true" /></Button></DialogClose></div>
        <nav aria-label="주요 메뉴" className="mobile-nav">
          <DialogClose asChild><a href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</a></DialogClose>
          <DialogClose asChild><a href="environment.html" aria-current={slug.startsWith('environment') ? 'page' : undefined}>Environment Art</a></DialogClose>
          <DialogClose asChild><a href="technical-art.html" aria-current={isTechnical ? 'page' : undefined}>Technical Art</a></DialogClose>
        </nav>
        <DialogClose asChild><Button asChild className="mobile-contact"><a href={`mailto:${email}`} aria-label="이메일 연락">Contact<Mail data-icon="inline-end" aria-hidden="true" /></a></Button></DialogClose>
      </DialogContent>
    </Dialog>
    </motion.div>
  </motion.div></motion.header>
}

function Footer() {
  return <footer className="site-footer" id="contact">
    <div className="footer-contact"><h2>LET’S TALK</h2><a href={`mailto:${email}`} className="email-link">{email}<ArrowUpRight aria-hidden="true" /></a></div>
    <Separator />
    <div className="footer-bottom"><span>© 2026 Shim YoungHwan</span><a href="https://github.com/Shim0Hwan" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true" /></a><a href="#main" aria-label="페이지 맨 위로"><ArrowUp aria-hidden="true" /></a></div>
  </footer>
}

function Home() {
  return <>
    <section className="home-hero panel" aria-labelledby="home-title">
      <div className="hero-heading">
        <div className="hero-kicker"><p>심영환 <span className="text-muted-foreground">/ SHIM</span></p><p>Environment Art<br />& Technical Art</p></div>
        <BlurFade><h1 className="hero-name" id="home-title" translate="no">YOUNGHWAN</h1></BlurFade>
      </div>
      <div id="about" className="home-profile">
        <section aria-labelledby="skills-title">
          <h2 id="skills-title">스킬</h2>
          <dl className="skill-list">
            <div><dt>테크니컬 아트</dt><dd>Unity · C# · ShaderLab · HLSL</dd></div>
            <div><dt>모델링 · 텍스처링</dt><dd>Blender · Substance (Painter, Designer)<br />Photoshop</dd></div>
          </dl>
        </section>
        <section aria-labelledby="experience-title">
          <h2 id="experience-title">이력</h2>
          <dl className="experience">
            <div><dt>2025</dt><dd><strong>민트로켓</strong><span>데이브 더 다이버 · TA 인턴</span></dd></div>
            <div><dt>2024</dt><dd><strong>MINOC · 프리랜서</strong><span>제품 모델링 · 영상 제작</span></dd></div>
            <div><dt>2021–2023</dt><dd><strong>공군 교수학습혁신센터</strong><span>3차원모델링 제작병 복무<br />3D/VR 훈련 콘텐츠 제작</span></dd></div>
          </dl>
        </section>
        <section aria-labelledby="education-title">
          <h2 id="education-title">학력</h2>
          <div className="education"><p className="meta">2026 · 학사</p><h3>부산대학교</h3><p>정보컴퓨터공학부</p></div>
        </section>
      </div>
    </section>
    <section id="work" className="discipline-section" aria-label="포트폴리오 분야">
      <a href="environment.html" className="discipline-link"><div><h2>ENVIRONMENT<br />ART</h2><ArrowUpRight aria-hidden="true" /></div><span className="discipline-label">배경 모델링</span></a>
      <a href="technical-art.html" className="discipline-link inverse"><div><h2>TECHNICAL<br />ART</h2><ArrowUpRight aria-hidden="true" /></div><span className="discipline-label">테크니컬 아트</span></a>
    </section>
  </>
}

function Environment() {
  return <><section className="page-heading"><BlurFade><h1 className="display-title">ENVIRONMENT ART</h1></BlurFade></section><section id="work" className="work-list" aria-label="배경 모델링 작업">
    {content.environment.map((item, index) => <article key={item.slug} className="work-row">
        <a className="work-link" href={`${item.slug}.html`} aria-label={`${item.title} 상세 보기`}><figure>
          <div className="work-image"><img src={item.image} alt={item.title} width={content.projects.find(p => p.slug === item.slug)!.cover[0].width} height={content.projects.find(p => p.slug === item.slug)!.cover[0].height} loading={index ? 'lazy' : 'eager'} fetchPriority={index ? 'auto' : 'high'} decoding="async" /></div>
          <figcaption className="work-caption"><h2 translate="no">{item.title}</h2><p className="meta">{index < 4 ? 'Prop study' : index === 4 ? 'Product film' : index === 5 ? 'Personal work' : 'Production'}</p></figcaption>
        </figure></a>
    </article>)}
  </section></>
}

function Technical() {
  return <><section className="page-heading"><BlurFade><h1 className="display-title">TECHNICAL ART</h1></BlurFade></section><div id="work" className="technical-layout">
    <nav className="project-rail" aria-label="TA 프로젝트"><span className="meta">프로젝트</span>{content.technical.map(item => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}<a href="#studies">개인 연구</a></nav>
    <div className="technical-projects">{content.technical.map((item, index) => <article id={item.id} className="technical-project" key={item.id}>
      <div className="project-title-row"><div><p className="meta">0{index + 1} / {index === 2 ? '민트로켓 · TA 인턴' : '팀 프로젝트'}</p><h2><a className="technical-project-link" href={`${item.slug}.html`} translate="no">{item.title}</a></h2></div><ArrowUpRight className="project-arrow" aria-hidden="true" /></div>
      <div className="technical-image"><img src={item.image} alt={`${item.title} 작업 화면`} width="960" height="540" loading={index ? 'lazy' : 'eager'} decoding="async" /></div>
      <div className="technical-info"><div><p>{item.summary}</p><p className="technical-role">{item.role}</p></div><ol className="feature-links">{item.features.map(feature => <li key={feature.href}><a href={feature.href}>{feature.title}<ArrowUpRight aria-hidden="true" /></a></li>)}</ol></div>
    </article>)}
    <article id="studies" className="technical-project studies-row"><div><p className="meta">개인 연구</p><h2><a className="technical-project-link" href="technical-studies.html">리깅과 재질 연구</a></h2></div><ArrowUpRight className="project-arrow" aria-hidden="true" /></article>
    </div>
  </div></>
}

function MediaFigure({media, eager = false}: {media: Media; eager?: boolean}) {
  const [failed, setFailed] = useState(false)
  const caption = media.caption.replace(/ \([^)]*초[^)]*\)/g, '').replace('자전거 쇼릴: 왼쪽 재질 적용본, 오른쪽 클레이', '재질 / Clay')
  return <figure className={cn('media-figure', media.width < media.height && 'portrait-media')}>
    {media.kind === 'video' ? <>
      <video controls playsInline preload="none" poster={media.poster} width={media.width} height={media.height} aria-label={media.alt} onError={() => setFailed(true)}><source src={media.src} type="video/mp4" /><a href={media.src}>영상 열기</a></video>
      {failed && <a className="media-fallback" href={media.src}>영상을 직접 열기 ↗</a>}
    </> : <Dialog><DialogTrigger asChild><button className="image-button" aria-label={`${media.caption || media.alt} 확대`}><img src={media.src} alt={media.alt} width={media.width} height={media.height} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} /><span className="zoom-icon" aria-hidden="true"><Maximize2 /></span></button></DialogTrigger><DialogContent showCloseButton={false} className="media-dialog" aria-describedby={undefined}>
      <div className="lightbox-top"><DialogTitle>{media.caption || media.alt}</DialogTitle><div className="flex items-center gap-2"><Button asChild variant="outline"><a href={media.src} target="_blank" rel="noopener noreferrer">원본<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a></Button><DialogClose asChild><Button variant="ghost" size="icon" aria-label="확대 이미지 닫기"><X aria-hidden="true" /></Button></DialogClose></div></div>
      <img className="lightbox-image" src={media.src} alt={media.alt} width={media.width} height={media.height} />
    </DialogContent></Dialog>}
    {caption && <figcaption>{caption}</figcaption>}
    {media.src === 'portfolio-bicycle-side-by-side.mp4' && <p className="music-credit">Music: <a href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300046" target="_blank" rel="noopener noreferrer">Dream Culture — Kevin MacLeod</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · 발췌·음량·페이드 편집</p>}
  </figure>
}

function ProjectPage({project}: {project: Project}) {
  const [activeSection, setActiveSection] = useState('')
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.detail-section'))
    let frame = 0
    const update = () => {
      const readingLine = Math.max((document.querySelector('.header-shell')?.getBoundingClientRect().bottom ?? 0) + 32, window.innerHeight * 0.3)
      const current = sections.find(section => {
        const { top, bottom } = section.getBoundingClientRect()
        return top <= readingLine && bottom > readingLine
      })
      setActiveSection(current?.id ?? '')
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [project.slug])
  const technical = project.category === 'technical'
  const list = technical ? 'technical-art.html' : 'environment.html'
  const entries = technical ? content.technical : content.environment
  const currentIndex = entries.findIndex(p => p.slug === project.slug)
  const next = currentIndex >= 0 ? entries[(currentIndex + 1) % entries.length] : null
  const meta = project.metadata.filter(item => !['TYPE', 'ASSET'].includes(item.label))
  return <>
    <section className="project-heading panel"><a href={list} className="back-link"><ArrowLeft aria-hidden="true" />{technical ? 'Technical Art' : 'Environment Art'}</a><BlurFade><h1 translate="no">{project.title}</h1></BlurFade><div className="project-overview"><p>{project.summary}</p><dl className="project-meta">{meta.map(item => <div key={item.label}><dt>{({WORK:'작업',FOCUS:'작업',ROLE:'담당',TOOLS:'도구',STACK:'도구',PROJECT:'프로젝트',YEAR:'연도',PERIOD:'기간',DURATION:'기간',ORGANIZATION:'소속',CLIENT:'의뢰처',SUBJECTS:'대상',FORMAT:'구성',TECHNIQUES:'기법'} as Record<string,string>)[item.label] || item.label}</dt><dd>{item.value}</dd></div>)}</dl></div></section>
    <div className="project-cover">{project.cover.map(media => <MediaFigure key={media.src} media={media} eager />)}</div>
    <div className="detail-layout"><nav className="project-rail" aria-label="프로젝트 목차"><span className="meta">{technical ? '연출 & 기능' : '제작 과정'}</span>{project.sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? 'location' : undefined}><span className="section-number">{String(index + 1).padStart(2,'0')}</span>{section.title}</a>)}</nav><div>
      {project.sections.map((section, index) => <section className="detail-section" id={section.id} key={section.id}><div className="section-title"><span className="meta">{String(index + 1).padStart(2,'0')}</span><h2>{section.title}</h2></div>
        {section.text.filter(text => !text.startsWith('왼쪽:')).map(text => <p className="section-copy" key={text}>{text}</p>)}
        <div className={cn('media-grid', section.id === 'materials' && section.media.length > 1 && 'material-grid', project.slug === 'technical-diablackjack' && section.id === 'tool' && 'wood-collage')}>{section.media.map(media => <MediaFigure key={media.src} media={media} />)}</div>
      </section>)}
    </div></div>
    {next && <a href={`${next.slug}.html`} className="next-project panel"><span className="meta">다음 작업</span><span>{next.title}</span><ArrowUpRight aria-hidden="true" /></a>}
  </>
}

export default function App() {
  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'})
    }
    // Images reserve their aspect ratios, so deep links also work before media loads.
    const frame = requestAnimationFrame(scrollToHash)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <div className="site-shell"><a className="skip-link" href="#main">본문으로 건너뛰기</a><Header /><main id="main" tabIndex={-1}>{project ? <ProjectPage project={project} /> : slug === 'environment' ? <Environment /> : slug === 'technical-art' ? <Technical /> : <Home />}</main><Footer /></div>
}
