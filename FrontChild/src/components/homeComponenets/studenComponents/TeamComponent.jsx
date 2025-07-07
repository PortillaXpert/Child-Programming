import { useEffect, useState } from 'react';
import { getTeamByStudentCode } from '../../../services/api/teamServiceApi';
import SkeletonCard from '../../common/skeletonCard';
import TeamCardContainer from '../../teams/TeamCardContainer';
import HeaderWithIcon from '../../common/HeaderWithIcon';
import StudentItem from '../../teams/StudentItem';
import { Typography, Stack } from '@mui/material';

function TeamComponent({ studentCode }) {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await getTeamByStudentCode(studentCode);
                setTeam(data);
            } catch (err) {
                console.error('Error al cargar equipo:', err);
            } finally {
                setLoading(false);
            }
        };

        if (studentCode) fetchTeam();
    }, [studentCode]);

    if (loading) return <SkeletonCard titleLines={1} items={3} />;

    return (
        <TeamCardContainer
            header={
                <HeaderWithIcon
                    title={team?.name?.toUpperCase()}
                    subtitle={`Curso: ${team.course}`}
                    iconSrc="/group.svg"
                />
            }
            content={
                <>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: 2 }}>Integrantes</Typography>
                    <Stack spacing={2}>
                        {team.students?.map((estudiante, index) => (
                            <StudentItem student={estudiante} index={index} />
                        ))}
                    </Stack>
                </>
            }
        />
    );
}

export default TeamComponent;
