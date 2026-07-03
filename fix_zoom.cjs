const fs = require('fs');

let typesContent = fs.readFileSync('src/types.ts', 'utf8');
typesContent = typesContent.replace('export interface ZoomRequest extends BaseRequest {\n  meetingTitle: string;', 'export interface ZoomRequest extends BaseRequest {\n  meetingTitle: string;\n  reason?: string;');
fs.writeFileSync('src/types.ts', typesContent);

let serverContent = fs.readFileSync('server.ts', 'utf8');
serverContent = serverContent.replace(
`    case RequestType.ZOOM:
      fullReq = {
        ...baseReq,
        meetingTitle: data.meetingTitle,
        meetingDate: data.meetingDate,
        startTime: data.startTime,
        endTime: data.endTime,
        alternativeHost: data.alternativeHost
      } as any;`,
`    case RequestType.ZOOM:
      fullReq = {
        ...baseReq,
        meetingTitle: data.meetingTitle,
        meetingDate: data.meetingDate,
        startTime: data.startTime,
        endTime: data.endTime,
        alternativeHost: data.alternativeHost,
        reason: data.reason
      } as any;`);
fs.writeFileSync('server.ts', serverContent);
