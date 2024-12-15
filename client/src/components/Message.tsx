import { useParams } from "react-router";

export default function Message() {
    const { id, name } = useParams()
    console.log(id, 'id', name, 'name use params message')
}