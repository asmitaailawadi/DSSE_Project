import Hero from "./Hero"
import FileUpload from "./FileUpload"
import Features from "./Features"

function Homepage() {
  return (
    <main className="flex-grow">
      <Hero />
      <FileUpload />
      <Features />
    </main>
  )
}

export default Homepage