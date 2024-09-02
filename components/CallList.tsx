'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

//@ts-nocheck
const CallList = ({type}:{type:'ended'|'upcoming'|'recordings'}) => {
    const {endedCalls, upcomingCalls, callRecordings,isLoading} = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const {toast} = useToast()

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.
                    map((meeting)=>meeting.queryRecordings()))

                const recordings = callData
                .filter(call => call.recordings.length > 0)
                .flatMap(call => call.recordings)

                setRecordings(recordings);
            } catch (error) {
                toast({title: "Try again later"})
            }
        }
        if(type === 'recordings') fetchRecordings();
    }, [type, callRecordings, toast])


    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    if(isLoading) return <Loader/>
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => {
                if (type === 'recordings' && 'filename' in meeting) {
                    return (
                        <MeetingCard
                            key={(meeting as CallRecording).filename}  // Use filename or another unique identifier
                            icon='/icons/recordings.svg'
                            title={(meeting as CallRecording).filename?.substring(0, 20) || 'Recording'}
                            date={(meeting as CallRecording).start_time?.toLocaleString() || 'Date Not Available'}
                            buttonIcon1='/icons/play.svg'
                            buttonText='Play'
                            handleClick={() => router.push((meeting as CallRecording).url || '')}
                            link={(meeting as CallRecording).url}
                        />
                    );
                } else if ('id' in meeting && type !== 'recordings') {
                    return (
                        <MeetingCard
                            key={(meeting as Call).id}
                            icon={type === 'ended' ? '/icons/previous.svg' : '/icons/upcoming.svg'}
                            title={(meeting as Call).state?.custom?.description?.substring(0, 26) || 'Personal Meeting'}
                            date={(meeting as Call).state?.startsAt?.toLocaleString() || 'Date Not Available'}
                            isPreviousMeeting={type === 'ended'}
                            buttonText='Start'
                            handleClick={() => router.push(`/meeting/${(meeting as Call).id}`)}
                            link={`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
                        />
                    );
                }
                return null;
            }) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList
