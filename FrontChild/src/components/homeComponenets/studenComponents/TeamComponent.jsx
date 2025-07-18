import { useMemo } from 'react';
import { getTeamByStudentCode } from '@/services/api/teamServiceApi';
import SkeletonCard from '@/components/others/skeletonCard';
import CardContainer from '@/components/common/CardContainer';
import HeaderWithIcon from '@/components/common/HeaderWithIcon';
import StudentItem from '@/components/teams/StudentItem';
import CustomSnackBar from '@/components/common/ui/CustomSnackBar';
import { Typography, Stack } from '@mui/material';
import { useFetchData } from '@/hooks/dataHooks/useFetchData';
import { useSnackBar} from '@/hooks/useSnackBar';

function TeamComponent({ studentCode }) {
    const {
        snackbarOpen,
        setSnackbarOpen,
        message,
        severity,
        showSnackbar
    } = useSnackBar();

    const fetchFn = useMemo(() => async () => {
        try {
            return await getTeamByStudentCode(studentCode);
        } catch (error) {
            showSnackbar('Error al cargar el equipo', 'error');
            throw error;
        }
    }, [studentCode]);

    const { data: team, loading } = useFetchData(fetchFn);

    if (loading) return <SkeletonCard titleLines={1} items={3} />;
    if (!team) return null;

    return (
        <>
            <CardContainer
                header={
                    <HeaderWithIcon
                        title={team?.name?.toUpperCase()}
                        subtitle={`Curso: ${team.course}`}
                        iconSrc="/group.svg"
                    />
                }
                content={
                    <>
                        <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: 2 }}>
                            Integrantes
                        </Typography>
                        <Stack spacing={2}>
                            {team.students?.map((estudiante, index) => (
                                <StudentItem key={index} student={estudiante} index={index} />
                            ))}
                        </Stack>
                    </>
                }
            />
            <CustomSnackBar
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                message={message}
                severity={severity}
            />
        </>
    );
}

export default TeamComponent;
