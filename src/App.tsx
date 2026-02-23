import { useRef, useState, type ChangeEventHandler } from 'react'
import './App.css'
import Method from 'afghan-square-maker/dist/src/method'
import Pattern from 'afghan-square-maker/dist/src/pattern'

const renderImage = (file: File, target: HTMLImageElement) => {
  return new Promise<void>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (ev) => {
      target.src = ev.target?.result?.toString() ?? ""
      resolve();
    }
    reader.readAsDataURL(file);
  })
}

const addToCanvas = (image: HTMLImageElement, target: HTMLCanvasElement) => {
  if (image.naturalHeight > 60 || image.naturalWidth > 60) {
    throw Error(`Image too large ${JSON.stringify({ height: image.naturalHeight, width: image.naturalWidth })} `)
  }

  target.width = image.naturalWidth
  target.height = image.naturalHeight
  const context = target.getContext("2d")
  if (!context) {
    throw Error("No 2D Context in Canvas")
  }

  context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
}

function App() {
  const [method, setMethod] = useState<string[]>([])
  const img = useRef<HTMLImageElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)

  const onFileChanged: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files === null || files.length === 0 || img.current === null || canvas.current === null) {
      return;
    }

    await renderImage(files[0], img.current)
    addToCanvas(img.current, canvas.current)
    const pattern = Pattern.FromCanvas(canvas.current)
    console.log({ pattern })
    setMethod(Method.FromPattern(pattern));
    e.target.files = null
  }

  return (
    <>
      <div className='flex flex-col'>
        {method.map((v) => <div>{v}</div>)}
      </div>
      <p>Hello</p>
      <input type="file" accept="image/*" onChange={onFileChanged} />
      <img ref={img} alt="uploaded image" />
      <canvas ref={canvas} />
    </>
  )
}

export default App
