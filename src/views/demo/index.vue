<script lang="ts" setup>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from "vue";

let dom:any
onMounted(async ()=>{
  init()
})
function init() {
  dom = document.querySelector('#three')
  const scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x050505 );
  scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
  const camera = new THREE.PerspectiveCamera(75,dom.clientWidth/dom.clientHeight,1,1000)
  camera.position.set(10,5,50)
  const render = new THREE.WebGLRenderer();
  render.setSize(dom.clientWidth,dom.clientHeight)
  dom.appendChild(render.domElement)

  const geometry = new THREE.BoxBufferGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({color:0xffff00})
  const cube = new THREE.Mesh(geometry,material)

  const boxGeometry = new THREE.BufferGeometry();
  let positions = [] , normals = [],colors = []
  const color = new THREE.Color()
  const Pa = new THREE.Vector3()
  const Pb = new THREE.Vector3()
  const Pc = new THREE.Vector3()
  const ua = new THREE.Vector3()
  const ub = new THREE.Vector3()
  let n = 400, n1 = n / 2
  let d = 12, d1 =d / 2
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * n - n1
    const y = Math.random() * n - n1
    const z = Math.random() * n - n1
    const ax = x + Math.random() * d - d1
    const ay = y + Math.random() * d - d1
    const az = z + Math.random() * d - d1
    const bx = x + Math.random() * d - d1
    const by = y + Math.random() * d - d1
    const bz = z + Math.random() * d - d1
    const cx = z + Math.random() * d - d1
    const cy = z + Math.random() * d - d1
    const cz = z + Math.random() * d - d1

    positions.push(ax,ay,az)
    positions.push(bx,by,bz)
    positions.push(cx,cy,cz)
    Pa.set(ax,ay,az)
    Pb.set(bx,by,bz)
    Pc.set(cx,cy,cz)

    ua.subVectors(Pc,Pb)
    ub.subVectors(Pa,Pb)
    ua.cross(ub)
    ua.normalize()
    normals.push(ua.x,ua.y,ua.z)
    normals.push(ua.x,ua.y,ua.z)
    normals.push(ua.x,ua.y,ua.z)

    // color
    let c1 = Math.random()
    let c2 = Math.random()
    let c3 = Math.random()
    color.setRGB(c1,c2,c3)
    const alpha = Math.random()
    colors.push(color.r,color.g,color.b,alpha)
    colors.push(color.r,color.g,color.b,alpha)
    colors.push(color.r,color.g,color.b,alpha)
  }
  function disposeArray(){
  }
  boxGeometry.setAttribute('position', new THREE.Float32BufferAttribute( positions,3).onUpload( disposeArray ) )
  boxGeometry.setAttribute('normal', new THREE.Float32BufferAttribute( normals,3).onUpload( disposeArray ))
  boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute( colors, 4).onUpload(disposeArray))
  const boxMaterial = new THREE.MeshPhongMaterial({
    color:0xaaaaaa, specular:0xffffff,shininess:250,
    side:THREE.DoubleSide, vertexColors:true,transparent:true
  })
  const boxMesh = new THREE.Mesh( boxGeometry, boxMaterial );

  const light  = new THREE.DirectionalLight(0xffffff,.5)
  light.position.set(2,2,2)
  const light1 = new THREE.DirectionalLight(0xffffff,1)
  light1.position.set(3,3,3)
  const light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
  light2.position.set( 4, - 4, 4 );
  const light3 = new THREE.DirectionalLight( 0xff00ff, 2);
  light2.position.set( 3, - 3, 3 );
  const controls = new OrbitControls(camera,render.domElement)
  controls.enableDamping = true
  const axeshelper = new THREE.AxesHelper(3)

  scene.add(
      camera,
      cube,
      axeshelper,
      boxMesh,
      light,
      light1,
      light2,
      light3,
  )

  function animate() {
    controls.update()
    render.render(scene,camera)
    requestAnimationFrame(animate)
  }
  animate()
}


</script>
<template>
  <div id="three" w100vw h100vh></div>
</template>

<style scoped>

</style>