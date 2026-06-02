import SEO from '@/components/ui/SEO'
export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="7 years of avocado happiness. Our story, our mission, and our local farmer partnerships." path="/about" />
      <div className="page-enter section-padding container-site">
        <h1 className="font-zing text-avo-olive text-h1 mb-4">About Avocadoria</h1>
        <p className="font-neue text-avo-brown">Brand story and farmer mission — Phase 3.</p>
      </div>
    </>
  )
}
