"use client"

import TimeAgo from 'react-timeago'

export default function CreatedAt({ timestamp }: { timestamp: Date }) {
    return (
        <TimeAgo date={timestamp} />
    )
}
