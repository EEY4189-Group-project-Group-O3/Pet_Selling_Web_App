export const calculateTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - postDate.getTime();

    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    if (differenceInDays > 0) {
        return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
    } else if (differenceInHours > 0) {
        return `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes > 0) {
        return `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''} ago`;
    } else {
        return "Just now";
    }
};