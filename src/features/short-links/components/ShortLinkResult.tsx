import type { ShortLinkResponse } from "../types/shortLink.types";

interface ShortLinkResultProps {
    link: ShortLinkResponse;
}

export const ShortLinkResult = ({ link }: ShortLinkResultProps) => {
    return (
        <div>{link.originalUrl}</div>
    )
}
