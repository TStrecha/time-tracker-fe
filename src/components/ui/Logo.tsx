const LOGO_IMAGE_PATH = '../logo-wo-bg.png';

const sizeMap = {
    'l': { width: 350, height: 100 },
    'm': { width: 250, height: 70 },
    's': { width: 150, height: 50 },
    'xs': { width: 50, height: 20 },
}

type Size = keyof typeof sizeMap;

interface Props {
    size?: Size;
}
export const Logo = ({ size = 'm' }: Props) => {
    const {width, height} = sizeMap[size]

    return (
        <img
            src={LOGO_IMAGE_PATH}
            width={`${width}vw`}
            height={`${height}vh`}
            style={{paddingTop: "0px", paddingBottom: "25px"}}
            alt={'Logo aplikace Time Tracker'}/>
    );
};