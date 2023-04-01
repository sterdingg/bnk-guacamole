import Image from 'next/image';
function Bnk_image(props) {
    return (
        <Image src={props.img_ref} width={parseInt(props.img_width)} height={parseInt(props.img_height)} alt={`${props.img_alt}`} />
    );
}

export default Bnk_image;