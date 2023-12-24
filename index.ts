const root2 = Math.sqrt(2);
const _throw = (e: string) => { throw e };
const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? _throw("Canvas not found.");
var ctx = canvas.getContext("2d") ?? _throw("Could not get context.");
ctx.imageSmoothingEnabled = false;
const topImg = document.getElementById("top") as HTMLImageElement ?? _throw("Could not find top image.");
const bottomImg = document.getElementById("bottom") as HTMLImageElement ?? _throw("Could not find bottom image.");
const sideImg = document.getElementById("side") as HTMLImageElement ?? _throw("Could not find side image.");

const topFaceRatio = 0.2;
const topFaceRatioX = Math.sqrt(1 - Math.pow(topFaceRatio, 2));
type Voxel = {
    x: number,
    y: number,
    z: number,
    color: string
};

function render(voxels: Voxel[]) {
    // Sort voxels by render order
    voxels.sort((a, b) => (a.x + a.y) - (b.x + b.y))
    voxels.sort((a, b) => b.z - a.z)

    for (const voxel of voxels) {

        drawVoxel(voxel);
    }
}

function drawVoxel(voxel: Voxel) {

    const startX = topFaceRatioX * (voxel.x - voxel.y);
    const startY = voxel.z + topFaceRatio * (voxel.x + voxel.y) + topFaceRatio;

    const scale = 30;
    const translateX = 400 + startX * scale;
    const translateY = 100 + startY * scale;

    ctx.setTransform(scale, 0, 0, scale, translateX, translateY + topFaceRatio * 2);
    
    const basicTransform = ctx.getTransform();

    ctx.lineWidth = 1 / scale;

    ctx.fillStyle = voxel.color;

    ctx.scale(Math.sqrt(2) * topFaceRatioX, Math.sqrt(2) * topFaceRatio);
    ctx.rotate(5 * Math.PI / 4);
    //ctx.fillRect(0, 0, 1, 1);
    //ctx.strokeRect(0, 0, 1, 1);
    ctx.drawImage(topImg, 0, 0, 1, 1);

    ctx.setTransform(basicTransform);
    ctx.transform(1, -topFaceRatio / topFaceRatioX, 0, 1, 0, 0);
    ctx.scale(topFaceRatioX, 1);

    //ctx.fillRect(0, 0, 1, 1);
    //ctx.strokeRect(0, 0, 1, 1);
    ctx.drawImage(bottomImg, 0, 0, 1, 1);

    ctx.setTransform(basicTransform);
    ctx.transform(-1, -topFaceRatio / topFaceRatioX, 0, 1, 0, 0);
    ctx.scale(topFaceRatioX, 1);

    //ctx.fillRect(0, 0, 1, 1);
    //ctx.strokeRect(0, 0, 1, 1);
    ctx.drawImage(bottomImg, 0, 0, 1, 1);
    


}

const voxels: Voxel[] = [];
const colors = ["red", "yellow", "green", "blue"];

outer:
for (let z = 0; z < 10; z++) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            if (Math.random() > 0.5)
                continue;

            voxels.push({
                x, y, z: z, color: colors[z % 4]
            });
        }
    }
}

render(voxels);