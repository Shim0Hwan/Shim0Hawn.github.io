import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Mail, Maximize2, Menu, X } from 'lucide-react'
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
const headerMotion = { threshold: 32, radius: 32, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }

function Header() {
  const aboutNavigation = useRef(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > headerMotion.threshold)
  const reducedMotion = useReducedMotion()
  const transition = { duration: reducedMotion ? 0 : headerMotion.duration, ease: headerMotion.ease }
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > headerMotion.threshold)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])
  return <motion.header layoutRoot className="header-shell"><motion.div layout={!reducedMotion} initial={false} animate={{ borderRadius: scrolled ? headerMotion.radius : 0 }} transition={transition} className="site-header" data-scrolled={scrolled}>
    <motion.nav layout="position" transition={transition} aria-label="주요 메뉴" className="main-nav">
      <a href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</a>
      <a href="environment.html" aria-current={slug.startsWith('environment') ? 'page' : undefined}>배경 모델러</a>
      <a href="technical-art.html" aria-current={isTechnical ? 'page' : undefined}>Technical Art</a>
      <a href="index.html#about">About</a>
    </motion.nav>
    <motion.a layout="position" transition={transition} className="mobile-home" href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</motion.a>
    <motion.div layout="position" transition={transition} className="header-actions">
    <Button asChild className="header-contact"><a href={`mailto:${email}`} aria-label="이메일 연락">Contact<Mail data-icon="inline-end" aria-hidden="true" /></a></Button>
    <Dialog>
      <DialogTrigger asChild><Button className="mobile-menu-trigger" variant="ghost" size="icon" aria-label="메뉴 열기"><Menu aria-hidden="true" /></Button></DialogTrigger>
      <DialogContent className="mobile-menu" showCloseButton={false} aria-describedby={undefined} onCloseAutoFocus={event => {
        if (aboutNavigation.current) {
          event.preventDefault()
          const about = document.getElementById('about')
          about?.focus({ preventScroll: true })
          about?.scrollIntoView({ block: 'start' })
          aboutNavigation.current = false
        }
      }}>
        <div className="mobile-menu-top"><DialogTitle>메뉴</DialogTitle><DialogClose asChild><Button variant="ghost" size="icon" aria-label="메뉴 닫기"><X aria-hidden="true" /></Button></DialogClose></div>
        <nav aria-label="주요 메뉴" className="mobile-nav">
          <DialogClose asChild><a href="index.html" aria-current={slug === 'index' ? 'page' : undefined}>Home</a></DialogClose>
          <DialogClose asChild><a href="environment.html" aria-current={slug.startsWith('environment') ? 'page' : undefined}>배경 모델러</a></DialogClose>
          <DialogClose asChild><a href="technical-art.html" aria-current={isTechnical ? 'page' : undefined}>Technical Art</a></DialogClose>
          <DialogClose asChild><a href="index.html#about" onClick={() => { aboutNavigation.current = slug === 'index' }}>About</a></DialogClose>
        </nav>
        <DialogClose asChild><Button asChild className="mobile-contact"><a href={`mailto:${email}`} aria-label="이메일 연락">Contact<Mail data-icon="inline-end" aria-hidden="true" /></a></Button></DialogClose>
      </DialogContent>
    </Dialog>
    </motion.div>
  </motion.div></motion.header>
}

function Footer() {
  return <footer className="site-footer" id="contact">
    <div className="footer-contact"><h2>LET’S TALK.</h2><a href={`mailto:${email}`} className="email-link">{email}<ArrowUpRight aria-hidden="true" /></a></div>
    <Separator />
    <div className="footer-bottom"><span>© 2026 Shim YoungHwan</span><a href="https://github.com/Shim0Hwan" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="#main" aria-label="페이지 맨 위로">↑</a></div>
  </footer>
}

function Home() {
  return <>
    <section className="home-hero panel" aria-labelledby="home-title">
      <div className="hero-kicker"><p>심영환 <span className="text-muted-foreground">/ SHIM</span></p><p>Environment Artist<br />& Technical Artist</p></div>
      <BlurFade><h1 className="hero-name" id="home-title" translate="no">YOUNGHWAN</h1></BlurFade>
      <div className="hero-feature">
        <div className="hero-intro"><p>형태를 만들고,<br />움직임을 구현합니다.</p><a href="#work" className="scroll-link" aria-label="포트폴리오 분야 보기"><ArrowDown aria-hidden="true" /></a></div>
        <BlurFade delay={0.12}><a href="environment-bicycle.html" className="hero-artwork"><img src="portfolio-bicycle.webp" alt="Bicycle — 자전거 프롭 모델링" width="1800" height="1013" fetchPriority="high" /><span>Bicycle <ArrowUpRight aria-hidden="true" /></span></a></BlurFade>
      </div>
    </section>
    <section id="work" className="discipline-section" aria-label="포트폴리오 분야">
      <BlurFade inView><a href="environment.html" className="discipline-link"><div><h2>ENVIRONMENT<br />ART</h2><ArrowUpRight aria-hidden="true" /></div><span className="discipline-label">배경 모델러</span></a></BlurFade>
      <BlurFade inView delay={0.08}><a href="technical-art.html" className="discipline-link inverse"><div><h2>TECHNICAL<br />ART</h2><ArrowUpRight aria-hidden="true" /></div><span className="discipline-label">테크니컬 아티스트</span></a></BlurFade>
    </section>
    <section id="about" className="about-panel panel inverse" tabIndex={-1}>
      <BlurFade inView><h2 className="display-title">ABOUT</h2></BlurFade>
      <div className="about-grid"><p className="about-lead">게임의 배경과 프롭,<br />셰이더와 애니메이션을<br />만드는 심영환입니다.</p><div>
        <dl className="experience">
          <div><dt>2025</dt><dd><strong>민트로켓</strong><span>데이브 더 다이버 · TA 인턴</span></dd></div>
          <div><dt>2024</dt><dd><strong>MINOC</strong><span>제품 모델링 · 영상 제작</span></dd></div>
          <div><dt>2021–2023</dt><dd><strong>공군 교수학습혁신센터</strong><span>교육용 3D 에셋 제작</span></dd></div>
        </dl>
        <p className="tools-line">Blender · Substance 3D Painter · Unity<br />C# · HLSL · Photoshop</p>
        <p className="education">부산대학교 정보컴퓨터공학부 학사 · 2026</p>
      </div></div>
    </section>
  </>
}

function PageHeading({ technical = false }: {technical?: boolean}) {
  return <section className="page-heading panel">
    <div className="heading-top"><p className="meta">{technical ? '02 / SHADERS, TOOLS & ANIMATION' : '01 / MODELING & TEXTURING'}</p><span>{technical ? '테크니컬 아티스트' : '배경 모델러'}</span></div>
    <BlurFade><h1 className="display-title">{technical ? 'TECHNICAL' : 'ENVIRONMENT'}<br />ART<span className="work-count">({technical ? '04' : '07'})</span></h1></BlurFade>
  </section>
}

function Environment() {
  return <><PageHeading /><section id="work" className="work-list" aria-label="배경 모델링 작업">
    {content.environment.map((item, index) => <BlurFade key={item.slug} inView>
      <article className={cn('work-row', index % 2 === 1 && 'work-row-reverse')}>
        <a className="work-image" href={`${item.slug}.html`} aria-label={`${item.title} 상세 보기`}><img src={item.image} alt={item.title} width={content.projects.find(p => p.slug === item.slug)!.cover[0].width} height={content.projects.find(p => p.slug === item.slug)!.cover[0].height} loading={index ? 'lazy' : 'eager'} decoding="async" /></a>
        <div className="work-caption"><span className="meta">{String(index + 1).padStart(2, '0')} / {index < 4 ? 'PROP STUDY' : index === 4 ? 'PRODUCT FILM' : index === 5 ? 'PERSONAL WORK' : 'PRODUCTION'}</span><h2><a href={`${item.slug}.html`} translate="no">{item.title}</a></h2><p>{item.summary}</p><Button asChild variant="outline" size="icon-lg"><a href={`${item.slug}.html`} aria-label={`${item.title} 상세 보기`}><ArrowUpRight aria-hidden="true" /></a></Button></div>
      </article>
    </BlurFade>)}
  </section></>
}

function Technical() {
  return <><PageHeading technical /><div id="work" className="technical-layout">
    <nav className="project-rail" aria-label="TA 프로젝트"><span className="meta">PROJECTS</span>{content.technical.map(item => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}<a href="#studies">개인 연구</a></nav>
    <div className="technical-projects">{content.technical.map((item, index) => <article id={item.id} className="technical-project" key={item.id}>
      <BlurFade inView><div className="project-title-row"><div><p className="meta">0{index + 1} / {index === 2 ? 'MINTROCKET · TA INTERN' : 'TEAM PROJECT'}</p><h2><a href={`${item.slug}.html`} translate="no">{item.title}</a></h2></div><Button asChild variant="outline" size="icon-lg"><a href={`${item.slug}.html`} aria-label={`${item.title} 상세 보기`}><ArrowUpRight aria-hidden="true" /></a></Button></div>
      <a className="technical-image" href={`${item.slug}.html`} aria-label={`${item.title} 상세 보기`}><img src={item.image} alt={`${item.title} 작업 화면`} width="960" height="540" loading={index ? 'lazy' : 'eager'} decoding="async" /></a></BlurFade>
      <div className="technical-info"><div><p>{item.summary}</p><p className="technical-role">{item.role}</p></div><ol className="feature-links">{item.features.map(feature => <li key={feature.href}><a href={feature.href}>{feature.title}<ArrowUpRight aria-hidden="true" /></a></li>)}</ol></div>
    </article>)}
    <article id="studies" className="studies-row"><div><p className="meta">PERSONAL STUDIES</p><h2>리깅과 재질 연구</h2></div><Button asChild variant="outline" size="icon-lg"><a href="technical-studies.html" aria-label="리깅과 재질 연구 상세 보기"><ArrowUpRight aria-hidden="true" /></a></Button></article>
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
  const technical = project.category === 'technical'
  const list = technical ? 'technical-art.html' : 'environment.html'
  const entries = technical ? content.technical : content.environment
  const currentIndex = entries.findIndex(p => p.slug === project.slug)
  const next = currentIndex >= 0 ? entries[(currentIndex + 1) % entries.length] : null
  const meta = project.metadata.filter(item => !['TYPE', 'ASSET'].includes(item.label))
  return <>
    <section className="project-heading panel"><a href={list} className="back-link"><ArrowLeft aria-hidden="true" />{technical ? 'Technical Art' : 'Environment Art'}</a><BlurFade><h1 translate="no">{project.title}</h1></BlurFade><div className="project-overview"><p>{project.summary}</p><dl className="project-meta">{meta.map(item => <div key={item.label}><dt>{({WORK:'작업',ROLE:'담당',TOOLS:'도구',STACK:'도구',PROJECT:'프로젝트',PERIOD:'기간'} as Record<string,string>)[item.label] || item.label}</dt><dd>{item.value}</dd></div>)}</dl></div></section>
    <div className="project-cover">{project.cover.map(media => <MediaFigure key={media.src} media={media} eager />)}</div>
    <div className="detail-layout"><nav className="project-rail" aria-label="프로젝트 목차"><span className="meta">{technical ? '연출 & 기능' : 'BREAKDOWN'}</span>{project.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span className="section-number">{String(index + 1).padStart(2,'0')}</span>{section.title}</a>)}</nav><div>
      {project.sections.map((section, index) => <section className="detail-section" id={section.id} key={section.id}><div className="section-title"><span className="meta">{String(index + 1).padStart(2,'0')}</span><h2>{section.title}</h2></div>
        {section.text.filter(text => !text.startsWith('왼쪽:')).map(text => <p className="section-copy" key={text}>{text}</p>)}
        <div className={cn('media-grid', section.id === 'materials' && section.media.length > 1 && 'material-grid')}>{section.media.map(media => <MediaFigure key={media.src} media={media} />)}</div>
      </section>)}
    </div></div>
    {next && <a href={`${next.slug}.html`} className="next-project panel"><span className="meta">NEXT PROJECT</span><span>{next.title}</span><ArrowUpRight aria-hidden="true" /></a>}
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
