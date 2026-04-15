import CandidateProfileClient from './CandidateDetailClient';

export async function generateStaticParams() {
  return [
    { id: 'abhijeet-resume-id' },
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, 
    { id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }
  ];
}

export default function CandidateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  return <CandidateProfileClient params={params} />;
}
