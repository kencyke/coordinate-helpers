import React, { useRef } from "react"
import { Color3, Mesh, Nullable, Vector3 } from "@babylonjs/core"
import { Engine, Scene, useBeforeRender } from "react-babylonjs"
import "./App.css"

type SpinningBoxProps = {
  name: string
  position: Vector3
  color: Color3
}

const SpinningBox: React.VFC<SpinningBoxProps> = (props) => {
  const boxRef = useRef<Nullable<Mesh>>(null)

  const rpm = 5
  useBeforeRender((scene) => {
    if (boxRef.current) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime()
      boxRef.current.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  })

  return (
    <box name={props.name} ref={boxRef} size={2} position={props.position}>
      <standardMaterial name={`${props.name}-mat`} diffuseColor={props.color} specularColor={Color3.Black()} />
    </box>
  )
}

const App: React.VFC = () => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="renderCanvas">
      <Scene>
        <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <SpinningBox name="box1" position={Vector3.Zero()} color={Color3.FromHexString("#C8F4F9")} />
      </Scene>
    </Engine>
  )
}

export default App
